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
var TYPES_1 = require("./TYPES");
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
                        return [2 /*return*/, commitPaths];
                }
            });
        });
    };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ29tbWl0U3Vic2V0VG9Db21taXRQYXRoTWFwcGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL0NvbW1pdFN1YnNldFRvQ29tbWl0UGF0aE1hcHBlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSx1Q0FBdUQ7QUFPdkQsaUNBQXVHO0FBR3ZHO0lBQUE7UUFlSTs7V0FFRztRQUVILFNBQUksR0FBVyxDQUFDLENBQUM7SUFpQnJCLENBQUM7SUFOUyw2Q0FBVSxHQUFoQjs7Ozs7NEJBQzhCLHFCQUFNLElBQUksQ0FBQyxRQUFRLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUE7O3dCQUF0RixPQUFPLEdBQWEsU0FBa0U7d0JBQ3RGLFdBQVcsR0FBaUIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLENBQUE7d0JBQzFELHNCQUFPLFdBQVcsRUFBQzs7OztLQUN0QjtJQTVCRDtRQURDLElBQUEsa0JBQU0sRUFBQyxzRkFBOEUsQ0FBQyxFQUFFLENBQUM7OzhEQUMzRDtJQU8vQjtRQURDLElBQUEsa0JBQU0sRUFBQyxzRkFBOEUsQ0FBQyxNQUFNLENBQUM7OzREQUMvRTtJQU1mO1FBREMsSUFBQSxvQkFBUSxHQUFFO1FBQUUsSUFBQSxrQkFBTSxFQUFDLHNGQUE4RSxDQUFDLElBQUksQ0FBQzs7MERBQ3ZGO0lBTWpCO1FBREMsSUFBQSxrQkFBTSxFQUFDLHNGQUE4RSxDQUFDLENBQUMsQ0FBQzs7dURBQy9FO0lBR1Y7UUFEQyxJQUFBLGtCQUFNLEVBQUMsc0ZBQThFLENBQUMsd0JBQXdCLENBQUM7OzREQUMvRTtJQTVCeEIsd0JBQXdCO1FBRHBDLElBQUEsc0JBQVUsR0FBRTtPQUNBLHdCQUF3QixDQW9DcEM7SUFBRCwrQkFBQztDQUFBLEFBcENELElBb0NDO0FBcENZLDREQUF3QiJ9