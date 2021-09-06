import {inject, injectable, optional} from "inversify";
import {DB, LocalityPreprocessor} from "bugfinder-framework";
import {
    CommitPath,
    CommitToCommitPathMapper
} from "bugfinder-localityrecorder-commitpath";
import {Commit} from "bugfinder-localityrecorder-commit";
import {BUGFINDER_COMMITPATH_LOCALITYPREPROCESSOR_COMMITSUBSETTOCOMMITPATHMAPPER_TYPES} from "./TYPES";

@injectable()
export class CommitSubsetToCommitPath implements LocalityPreprocessor<CommitPath> {

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
        return commitPaths;
    }

}