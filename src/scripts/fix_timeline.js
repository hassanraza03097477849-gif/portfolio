"use strict";
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
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
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
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
var app_1 = require("firebase-admin/app");
var firestore_1 = require("firebase-admin/firestore");
if (!(0, app_1.getApps)().length) {
    (0, app_1.initializeApp)({
        credential: (0, app_1.cert)({
            projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
            clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
            privateKey: (_a = process.env.FIREBASE_PRIVATE_KEY) === null || _a === void 0 ? void 0 : _a.replace(/\\n/g, '\n'),
        }),
    });
}
var db = (0, firestore_1.getFirestore)();
function fixTimelineData() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    console.log("Injecting proper dummy data to cv/main...");
                    return [4 /*yield*/, db.collection("cv").doc("main").set({
                            name: "Hassan Raza",
                            title: "Full Stack Developer",
                            email: "hassanraza03097477849@gmail.com",
                            phone: "0309-7477849",
                            location: "Karachi, Pakistan",
                            avatarUrl: "",
                            summary: "I am a highly driven Full Stack Developer based in Karachi, Pakistan, specializing in architecting robust, scalable backend systems and dynamic frontend interfaces. My approach is deeply analytical, stemming from a foundation in Pre-Engineering, which allows me to approach software development as a rigorous discipline of logic and optimization.",
                            experience: [
                                {
                                    role: "Full Stack Developer",
                                    company: "Raddium Technology",
                                    dates: "Jan 2025 - May 2026",
                                    description: "- Engineered mission-critical backend architecture...\n- Designed and deployed secure RESTful APIs...\n- Implemented comprehensive OAuth 2.0...",
                                    tags: ["Laravel", "MySQL", "REST API", "OAuth"]
                                },
                                {
                                    role: "Receptionist / Admin",
                                    company: "Al-Azhar School",
                                    dates: "2024 - 2025",
                                    description: "Managed fast-paced front-desk operations, visitor handling, and highly detailed student administrative records, fostering a strong foundation in data organization.",
                                    tags: ["Admin", "Data Entry"]
                                },
                                {
                                    role: "Billing Operator",
                                    company: "Nafey Traders",
                                    dates: "2023 - 2024",
                                    description: "Operated high-throughput POS systems for billing execution and implemented proactive inventory stock level management protocols.",
                                    tags: ["POS", "Inventory"]
                                }
                            ]
                        })];
                case 1:
                    _a.sent();
                    console.log("Done!");
                    return [2 /*return*/];
            }
        });
    });
}
fixTimelineData().catch(console.error);
