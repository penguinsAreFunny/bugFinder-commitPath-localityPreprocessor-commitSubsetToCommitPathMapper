import { DB, LocalityPreprocessor } from "bugfinder-framework";
import { CommitPath, CommitToCommitPathMapper } from "bugfinder-localityrecorder-commitpath";
import { Commit } from "bugfinder-localityrecorder-commit";
export declare class CommitSubsetToCommitPath implements LocalityPreprocessor<CommitPath> {
    /**
     * DB interface to use to read 0-localities from
     */
    commitDB: DB<Commit, any, any>;
    /**
     * The ID of the DB from which the commits should be read.
     * F.e. the collection of the MongoDB which contains commits. F.e. "Commits"
     */
    fromID: string;
    /**
     * Number of elements to skip in DB.
     */
    skip: number;
    /**
     * Number of commits to read from DB.
     */
    n: number;
    mapper: CommitToCommitPathMapper;
    preprocess(): Promise<CommitPath[]>;
}
