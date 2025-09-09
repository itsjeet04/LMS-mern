import Course from "../../models/course.model.js";


//get course by id
export const getCourseById = async(req,res) => {
    const {id} = req.params
    try {
        
        const courseData = await Course.findById(id).populate({path:'educator'})
        
        //remove lecture url if preview and free 
        courseData.courseContent.forEach(chapter => {
            chapter.chapterContent.forEach(lecture=>{
                if(!lecture.isPreviewFree){
                    lecture.lectureUrl = ""
                }
            })
        });
          res.json({
      success: true,
      course: courseData,
    });

    } catch (error) {
        console.error(error)
        res.json({success: false , message :  error.message})
    }
}