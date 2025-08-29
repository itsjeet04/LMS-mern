import mongoose from "mongoose";

const lectureSchema = new mongoose.Schema({
    lectureId: {
        type: String,
        required: true
    },
    lectureTitle: {
        type: String,
        required: true
    },
    lectureDuration: {
        type: Number,
        required: true
    },
    lectureUrl: {
        type: String,
    },
    isPreviewFree: {
        type: Boolean,
        default: false
    },
    lectureOrder: {
        type: Number,
        required: true
    }
}, { _id: false });

const chapterScheme = new mongoose.Schema({
    chapterId: {
        type: String,
        required: true
    },
    chapterTitle: {
        type: String,
        required: true
    },
    chapterOrder: {
        type: Number,
        required: true
    },
    chapterContent: [lectureSchema]
}, { _id: false });

const courseSchema = new mongoose.Schema(
    {
        courseTitle: {
            type: String,
            required: true
        },
        courseDescription: {
            type: String,
            required: true
        },
        courseThumbnail: {
            type: String,
            required: true
        },
        coursePrice: {
            type: Number,
            required: true
        },
        isPublished: {
            type: Boolean,
            default: true
        },
        discount: {
            type: Number,
            default: 0,
            required: true,
            min: 0,
        },
        courseContent: [chapterScheme],
        courseRatings: [
            {
                userId: {
                    type: String,
                    required: true
                },
                rating: {
                    type: Number,
                    required: true,
                    min: 1,
                    max: 5
                },
            }
        ],
        educator: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        }
    }, { timestamps: true, minimize: false }
    // minimize : false -> to save empty objects in the database 
    // by default mongoose removes empty objects
)

const Course = mongoose.model("Course", courseSchema);

export default Course;