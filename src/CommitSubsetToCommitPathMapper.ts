import {inject, injectable, optional} from "inversify";
import {DB, LocalityPreprocessor} from "bugfinder-framework";
import {
    CommitPath,
    CommitToCommitPathMapper, PathsHandling
} from "bugfinder-localityrecorder-commitpath";
import {Commit, GitFileType} from "bugfinder-localityrecorder-commit";
import {BUGFINDER_COMMITPATH_LOCALITYPREPROCESSOR_COMMITSUBSETTOCOMMITPATHMAPPER_TYPES} from "./TYPES";

@injectable()
export class CommitSubsetToCommitPath implements LocalityPreprocessor<CommitPath> {

    @optional() @inject(BUGFINDER_COMMITPATH_LOCALITYPREPROCESSOR_COMMITSUBSETTOCOMMITPATHMAPPER_TYPES.pathsHandling)
    pathsHandling: PathsHandling;

    /**
     * DB interface to use to read 0-localities from
     */
    @inject(BUGFINDER_COMMITPATH_LOCALITYPREPROCESSOR_COMMITSUBSETTOCOMMITPATHMAPPER_TYPES.db)
    commitDB: DB<Commit, any, any>;

    /**
     * The ID of the DB from which the commits should be read.
     * F.e. the collection of the MongoDB which contains commits. F.e. "Commits"
     */
    @inject(BUGFINDER_COMMITPATH_LOCALITYPREPROCESSOR_COMMITSUBSETTOCOMMITPATHMAPPER_TYPES.fromID)
    fromID: string;

    /**
     * Number of elements to skip in DB.
     */
    @optional() @inject(BUGFINDER_COMMITPATH_LOCALITYPREPROCESSOR_COMMITSUBSETTOCOMMITPATHMAPPER_TYPES.skip)
    skip: number = 0;

    /**
     * Number of commits to read from DB.
     */
    @inject(BUGFINDER_COMMITPATH_LOCALITYPREPROCESSOR_COMMITSUBSETTOCOMMITPATHMAPPER_TYPES.n)
    n: number;

    @inject(BUGFINDER_COMMITPATH_LOCALITYPREPROCESSOR_COMMITSUBSETTOCOMMITPATHMAPPER_TYPES.commitToCommitPathMapper)
    mapper: CommitToCommitPathMapper;

    async preprocess(): Promise<CommitPath[]> {
        const commits: Commit[] = await this.commitDB.readLocalities(this.fromID, this.skip, this.n);
        const commitPaths: CommitPath[] = this.mapper.map(commits)
        return this.applyPathHandling(commitPaths);
    }

    public applyPathHandling(localities: CommitPath[]): CommitPath[] {
        console.log(`Applying path handling for ${localities.length} localities.`)
        let commits: Commit[] = CommitPath.getCommits(localities);

        // pathsHandling: filter commitPath which do not comply the pathIncludes pattern
        const filterPathIncludes: (CommitPath) => boolean = (commitPath: CommitPath) => {
            if (commitPath.path) return this.pathsHandling.pathIncludes.test(commitPath.path.path);
            return true;
        }

        if (this.pathsHandling && this.pathsHandling.pathIncludes) {
            localities = localities.filter(filterPathIncludes);
            console.log("localities after filtering pathIncludes: ", localities.length)
        }

        // remove paths which are deleted
        const removeDeletedPaths: (CommitPath) => boolean = (commitPath: CommitPath) => {
            if (commitPath.path) return commitPath.path.type !== GitFileType.deleted;
            return true;
        }
        localities = localities.filter(removeDeletedPaths);
        console.log("localities after removing deleted paths: ", localities.length)

        const localityMap = new Map<string, CommitPath>();
        localities.forEach(l => {
            localityMap.set(l.commit.hash, l);
        })

        // inject paths for each unique commit
        commits.forEach(commit => {
            const commitPath = localityMap.get(commit.hash);
            if (commitPath == null || (commitPath.path == null && !this.pathsHandling?.injectOnEmptyPaths)) {
                // do not inject on empty paths
                return
            }
            this.pathsHandling?.injections?.forEach(injection => {
                const injectedCommitPath = new CommitPath();
                injectedCommitPath.commit = commit;
                injectedCommitPath.path = {
                    path: injection,
                    type: GitFileType.other
                };
                localities.push(injectedCommitPath);
                localityMap.set(commit.hash, injectedCommitPath)
            })

        });
        console.log("localities after injecting pathInjections: ", localities.length)
        console.log(`PathHandling got ${localities.length} localities from ${commits.length} commits.`)
        return localities;
    }

}