"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DefaultCommitPathMapper = void 0;
var inversify_1 = require("inversify");
var commitPath_1 = require("../commitPath");
/**
 * Maps an array of Commits to an array of CommitPaths using optional pathsHandling.
 * Strategy: Each file in commit will generate a new CommitPath-Object. CommitPath-Objects
 * are then filtered and injected with pathHandling-options, deleted files are dismissed
 */
var DefaultCommitPathMapper = /** @class */ (function () {
    function DefaultCommitPathMapper() {
    }
    DefaultCommitPathMapper.prototype.map = function (commits) {
        var localities = [];
        // @formatter:on
        console.log("Total commits: ", commits.length);
        // create single 0-localities from each file of each commit
        commits.forEach(function (commit) {
            // create locality for empty files. Needed for commit history reconstruction!
            if (commit.files.files.length === 0) {
                var locality = new commitPath_1.CommitPath(commit);
                localities.push(locality);
                return;
            }
            commit.files.files.forEach(function (file) {
                // copy content of Commit to CommitPath
                var locality = new commitPath_1.CommitPath(commit, file);
                localities.push(locality);
            });
        });
        console.log("0-localities for each file of each commit: ", localities.length);
        return localities;
    };
    DefaultCommitPathMapper = __decorate([
        (0, inversify_1.injectable)()
    ], DefaultCommitPathMapper);
    return DefaultCommitPathMapper;
}());
exports.DefaultCommitPathMapper = DefaultCommitPathMapper;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVmYXVsdENvbW1pdFBhdGhNYXBwZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9idWdGaW5kZXItbG9jYWxpdHlSZWNvcmRlci1jb21taXRQYXRoL3NyYy9jb21taXRUb0NvbW1pdFBhdGgvZGVmYXVsdENvbW1pdFBhdGhNYXBwZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQUEsdUNBQXFDO0FBR3JDLDRDQUF5QztBQUV6Qzs7OztHQUlHO0FBRUg7SUFBQTtJQTRCQSxDQUFDO0lBMUJHLHFDQUFHLEdBQUgsVUFBSSxPQUFpQjtRQUdqQixJQUFNLFVBQVUsR0FBb0IsRUFBRSxDQUFDO1FBQ3ZDLGdCQUFnQjtRQUNoQixPQUFPLENBQUMsR0FBRyxDQUFDLGlCQUFpQixFQUFFLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQTtRQUU5QywyREFBMkQ7UUFDM0QsT0FBTyxDQUFDLE9BQU8sQ0FBQyxVQUFDLE1BQWM7WUFDM0IsNkVBQTZFO1lBQzdFLElBQUksTUFBTSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsTUFBTSxLQUFLLENBQUMsRUFBRTtnQkFDakMsSUFBTSxRQUFRLEdBQUcsSUFBSSx1QkFBVSxDQUFDLE1BQU0sQ0FBQyxDQUFDO2dCQUN4QyxVQUFVLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO2dCQUMxQixPQUFPO2FBQ1Y7WUFFRCxNQUFNLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsVUFBQyxJQUFJO2dCQUM1Qix1Q0FBdUM7Z0JBQ3ZDLElBQU0sUUFBUSxHQUFHLElBQUksdUJBQVUsQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLENBQUM7Z0JBQzlDLFVBQVUsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7WUFDOUIsQ0FBQyxDQUFDLENBQUE7UUFDTixDQUFDLENBQUMsQ0FBQztRQUNILE9BQU8sQ0FBQyxHQUFHLENBQUMsNkNBQTZDLEVBQUUsVUFBVSxDQUFDLE1BQU0sQ0FBQyxDQUFBO1FBRTdFLE9BQU8sVUFBVSxDQUFDO0lBQ3RCLENBQUM7SUEzQlEsdUJBQXVCO1FBRG5DLElBQUEsc0JBQVUsR0FBRTtPQUNBLHVCQUF1QixDQTRCbkM7SUFBRCw4QkFBQztDQUFBLEFBNUJELElBNEJDO0FBNUJZLDBEQUF1QiJ9