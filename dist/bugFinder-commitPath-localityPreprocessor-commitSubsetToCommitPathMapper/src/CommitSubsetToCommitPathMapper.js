"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommitSubsetToCommitPath = void 0;
var inversify_1 = require("inversify");
var bugfinder_localityrecorder_commitpath_1 = require("bugfinder-localityrecorder-commitpath");
var bugfinder_localityrecorder_commit_1 = require("bugfinder-localityrecorder-commit");
var TYPES_1 = require("./TYPES");
var src_1 = require("../../bugFinder-localityRecorder-commitPath/src");
var CommitSubsetToCommitPath = /** @class */ (function () {
    function CommitSubsetToCommitPath() {
        /**
         * Number of elements to skip in DB.
         */
        this.skip = 0;
    }
    CommitSubsetToCommitPath.prototype.preprocess = function () {
        return __awaiter(this, void 0, void 0, function () {
            var commits, commitPaths;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.commitDB.readLocalities(this.fromID, this.skip, this.n)];
                    case 1:
                        commits = _a.sent();
                        commitPaths = this.mapper.map(commits);
                        return [2 /*return*/, this.applyPathHandling(commitPaths)];
                }
            });
        });
    };
    CommitSubsetToCommitPath.prototype.applyPathHandling = function (localities) {
        var _this = this;
        console.log("Applying path handling for " + localities.length + " localities.");
        var commits = bugfinder_localityrecorder_commitpath_1.CommitPath.getCommits(localities);
        // pathsHandling: filter commitPath which do not comply the pathIncludes pattern
        var filterPathIncludes = function (commitPath) {
            if (commitPath.path)
                return _this.pathsHandling.pathIncludes.test(commitPath.path.path);
            return true;
        };
        if (this.pathsHandling && this.pathsHandling.pathIncludes) {
            localities = localities.filter(filterPathIncludes);
            console.log("localities after filtering pathIncludes: ", localities.length);
        }
        // remove paths which are deleted
        var removeDeletedPaths = function (commitPath) {
            if (commitPath.path)
                return commitPath.path.type !== bugfinder_localityrecorder_commit_1.GitFileType.deleted;
            return true;
        };
        localities = localities.filter(removeDeletedPaths);
        console.log("localities after removing deleted paths: ", localities.length);
        var localityMap = new Map();
        localities.forEach(function (l) {
            localityMap.set(l.commit.hash, l);
        });
        // inject paths for each unique commit
        commits.forEach(function (commit) {
            var _a, _b, _c;
            var commitPath = localityMap.get(commit.hash);
            if (commitPath == null || (commitPath.path == null && !((_a = _this.pathsHandling) === null || _a === void 0 ? void 0 : _a.injectOnEmptyPaths))) {
                // do not inject on empty paths
                return;
            }
            (_c = (_b = _this.pathsHandling) === null || _b === void 0 ? void 0 : _b.injections) === null || _c === void 0 ? void 0 : _c.forEach(function (injection) {
                var injectedCommitPath = new bugfinder_localityrecorder_commitpath_1.CommitPath();
                injectedCommitPath.commit = commit;
                injectedCommitPath.path = {
                    path: injection,
                    type: bugfinder_localityrecorder_commit_1.GitFileType.other
                };
                localities.push(injectedCommitPath);
                localityMap.set(commit.hash, injectedCommitPath);
            });
        });
        console.log("localities after injecting pathInjections: ", localities.length);
        console.log("PathHandling got " + localities.length + " localities from " + commits.length + " commits.");
        return localities;
    };
    var _a;
    __decorate([
        (0, inversify_1.optional)(),
        (0, inversify_1.inject)(TYPES_1.BUGFINDER_COMMITPATH_LOCALITYPREPROCESSOR_COMMITSUBSETTOCOMMITPATHMAPPER_TYPES.pathsHandling),
        __metadata("design:type", typeof (_a = typeof src_1.PathsHandling !== "undefined" && src_1.PathsHandling) === "function" ? _a : Object)
    ], CommitSubsetToCommitPath.prototype, "pathsHandling", void 0);
    __decorate([
        (0, inversify_1.inject)(TYPES_1.BUGFINDER_COMMITPATH_LOCALITYPREPROCESSOR_COMMITSUBSETTOCOMMITPATHMAPPER_TYPES.db),
        __metadata("design:type", Object)
    ], CommitSubsetToCommitPath.prototype, "commitDB", void 0);
    __decorate([
        (0, inversify_1.inject)(TYPES_1.BUGFINDER_COMMITPATH_LOCALITYPREPROCESSOR_COMMITSUBSETTOCOMMITPATHMAPPER_TYPES.fromID),
        __metadata("design:type", String)
    ], CommitSubsetToCommitPath.prototype, "fromID", void 0);
    __decorate([
        (0, inversify_1.optional)(),
        (0, inversify_1.inject)(TYPES_1.BUGFINDER_COMMITPATH_LOCALITYPREPROCESSOR_COMMITSUBSETTOCOMMITPATHMAPPER_TYPES.skip),
        __metadata("design:type", Number)
    ], CommitSubsetToCommitPath.prototype, "skip", void 0);
    __decorate([
        (0, inversify_1.inject)(TYPES_1.BUGFINDER_COMMITPATH_LOCALITYPREPROCESSOR_COMMITSUBSETTOCOMMITPATHMAPPER_TYPES.n),
        __metadata("design:type", Number)
    ], CommitSubsetToCommitPath.prototype, "n", void 0);
    __decorate([
        (0, inversify_1.inject)(TYPES_1.BUGFINDER_COMMITPATH_LOCALITYPREPROCESSOR_COMMITSUBSETTOCOMMITPATHMAPPER_TYPES.commitToCommitPathMapper),
        __metadata("design:type", Object)
    ], CommitSubsetToCommitPath.prototype, "mapper", void 0);
    CommitSubsetToCommitPath = __decorate([
        (0, inversify_1.injectable)()
    ], CommitSubsetToCommitPath);
    return CommitSubsetToCommitPath;
}());
exports.CommitSubsetToCommitPath = CommitSubsetToCommitPath;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ29tbWl0U3Vic2V0VG9Db21taXRQYXRoTWFwcGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL0NvbW1pdFN1YnNldFRvQ29tbWl0UGF0aE1hcHBlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSx1Q0FBdUQ7QUFFdkQsK0ZBRytDO0FBQy9DLHVGQUFzRTtBQUN0RSxpQ0FBdUc7QUFDdkcsdUVBR3lEO0FBR3pEO0lBQUE7UUFrQkk7O1dBRUc7UUFFSCxTQUFJLEdBQVcsQ0FBQyxDQUFDO0lBcUVyQixDQUFDO0lBMURTLDZDQUFVLEdBQWhCOzs7Ozs0QkFDOEIscUJBQU0sSUFBSSxDQUFDLFFBQVEsQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBQTs7d0JBQXRGLE9BQU8sR0FBYSxTQUFrRTt3QkFDdEYsV0FBVyxHQUFpQixJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQTt3QkFDMUQsc0JBQU8sSUFBSSxDQUFDLGlCQUFpQixDQUFDLFdBQVcsQ0FBQyxFQUFDOzs7O0tBQzlDO0lBRU0sb0RBQWlCLEdBQXhCLFVBQXlCLFVBQXdCO1FBQWpELGlCQWtEQztRQWpERyxPQUFPLENBQUMsR0FBRyxDQUFDLGdDQUE4QixVQUFVLENBQUMsTUFBTSxpQkFBYyxDQUFDLENBQUE7UUFDMUUsSUFBSSxPQUFPLEdBQWEsa0RBQVUsQ0FBQyxVQUFVLENBQUMsVUFBVSxDQUFDLENBQUM7UUFFMUQsZ0ZBQWdGO1FBQ2hGLElBQU0sa0JBQWtCLEdBQTRCLFVBQUMsVUFBc0I7WUFDdkUsSUFBSSxVQUFVLENBQUMsSUFBSTtnQkFBRSxPQUFPLEtBQUksQ0FBQyxhQUFhLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxVQUFVLENB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