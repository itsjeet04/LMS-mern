import React, { useContext, useEffect, useRef, useState } from 'react'
import uniqid from 'uniqid'
import Quill from 'quill'
import 'quill/dist/quill.snow.css';
import { assets } from '../../assets/assets'
import { AppContext } from '../../context/AppContext';
import { toast } from 'react-toastify';
import axios from 'axios';

function AddCourse() {

  const {backendUrl , getToken } = useContext(AppContext)

  const quillRef = useRef(null)
  const editorRef = useRef(null)

  const [courseTitle, setCourseTitle] = useState('')
  const [coursePrice, setCoursePrice] = useState(0)
  const [discount, setDiscount] = useState(0)
  const [image, setImage] = useState(null)
  const [chapters, setChapters] = useState([])
  const [showPopUp, setShowPopup] = useState(false)
  const [currentChapterid, setCurrentChapterId] = useState(null)
  const [lectureDetails, setLectureDetails] = useState({
    lectureTitle: '',
    lectureDuration: '',
    lectureUrl: '',
    isPreviewFree: false,
  })

  useEffect(() => {
    if (!quillRef.current && editorRef.current) {
      quillRef.current = new Quill(editorRef.current, {
        theme: 'snow',
      })
    }
  }, [])

  const handleChapter = (action, chapterId) => {
    if (action === 'add') {
      const title = prompt('Enter chapter title:');
      if (title) {
        const newChapter = {
          chapterId: uniqid(),
          chapterTitle: title,
          chapterContent: [],
          collapsed: false,
          chapterOrder: chapters.length > 0 ? chapters.slice(-1)[0].chapterOrder + 1 : 1,
        };
        setChapters([...chapters, newChapter]);
      }
    } else if (action === 'remove') {
      setChapters(chapters.filter((chapter) => chapter.chapterId !== chapterId));
    } else if (action === 'toggle') {
      setChapters(chapters.map((chapter) => chapter.chapterId === chapterId ? { ...chapter, collapsed: !chapter.collapsed } : chapter));
    };
  };

  const handleLecture = (action, chapterId, lectureId) => {
    if (action === "add") {
      setCurrentChapterId(chapterId);
      setShowPopup(true);
    } else if (action === "remove") {
      setChapters(
        chapters.map((chapter) => {
          if (chapter.chapterId === chapterId) {
            return {
              ...chapter,
              // FIX: Removing lecture by its unique ID, not its index, which is safer
              chapterContent: chapter.chapterContent.filter(
                (lecture) => lecture.lectureId !== lectureId
              ),
            };
          }
          return chapter;
        })
      );
    }
  };

  const addLecture = () => {
    if (currentChapterid) {
      if (!lectureDetails.lectureTitle || !lectureDetails.lectureDuration || !lectureDetails.lectureUrl) {
        alert("Please fill all lecture fields.");
        return;
      }

      setChapters(chapters.map((chapter) => {
        if (chapter.chapterId === currentChapterid) {
          const newLecture = {
            ...lectureDetails,
            lectureId: uniqid(),
            lectureOrder: chapter.chapterContent.length + 1
          };
          return {
            ...chapter,
            chapterContent: [...chapter.chapterContent, newLecture]
          };
        }
        return chapter;
      }));

      setLectureDetails({
        lectureTitle: '',
        lectureDuration: '',
        lectureUrl: '',
        isPreviewFree: false,
      });
      setShowPopup(false);
      setCurrentChapterId(null); // Good practice to clear the current ID
    }
  }
  const handleSubmit = async (e) => {
  try {
    e.preventDefault();

    if (!courseTitle || !coursePrice || !image || chapters.length === 0) {
      toast.error("Please fill all required fields.");
      return; // stop further execution
    }

    const courseData = {
      courseTitle,
      courseDescription: quillRef.current.root.innerHTML,
      coursePrice: Number(coursePrice),
      discount: Number(discount),
      courseContent: chapters,
    };

    const formData = new FormData();
    formData.append('courseData', JSON.stringify(courseData));
    formData.append('thumbnail', image);

    const token = await getToken();
    const { data } = await axios.post(
      backendUrl + 'api/educator/add-course',
      formData,
      {
        headers: { 
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      }
    );

    if (data?.success) {
      toast.success(data.message);
      setCourseTitle('');
      setCoursePrice(0);
      setDiscount(0);
      setImage(null); 
      setChapters([]);
      quillRef.current.root.innerHTML = '';
    } else {
      toast.error(data.message);
    }

  } catch (error) {
    console.error(error);
    toast.error(error.message);
  }
};


  return (
    <div className="p-4 sm:p-6 md:p-8 bg-gray-50 min-h-screen text-gray-800">
      <form onSubmit={handleSubmit} className="space-y-8 max-w-4xl mx-auto">
        {/* Course Title */}
        <div className="flex flex-col gap-2">
          <p className="font-semibold text-gray-700">Course Title</p>
          <input
            onChange={e => setCourseTitle(e.target.value)}
            value={courseTitle}
            type='text'
            placeholder='type here'
            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition"
          />
        </div>

        {/* Course Description */}
        <div className="flex flex-col gap-2">
          <p className="font-semibold text-gray-700">Course Description :</p>
          <div ref={editorRef} className="bg-white rounded-md border border-gray-300 h-48"></div>
        </div>

        {/* Price and Discount */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="flex flex-col gap-2">
            <p className="font-semibold text-gray-700">Course Price</p>
            <input
              onChange={e => setCoursePrice(e.target.value)}
              value={coursePrice}
              placeholder='0'
              type='number'
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition"
            />
          </div>
          <div className="flex flex-col gap-2">
            <p className="font-semibold text-gray-700">Discount%</p>
            <input
              onChange={e => setDiscount(e.target.value)}
              value={discount}
              type='number'
              placeholder='0'
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition"
            />
          </div>
        </div>

        {/* Course Thumbnail */}
        <div className="flex flex-col gap-2">
          <p className="font-semibold text-gray-700">Course Thumbnail</p>
          <label htmlFor='thumbnailimage' className="cursor-pointer border-2 border-dashed border-gray-300 rounded-lg p-6 flex flex-col items-center justify-center hover:bg-gray-100 transition">
            <img src={assets.file_upload_icon} className="w-12 h-12 mb-2" alt="Upload Icon" />
            <input
              type='file'
              id='thumbnailimage'
              onChange={e => (
                setImage(e.target.files[0])
              )}
              accept='image/*'
              hidden />
          </label>
          {image && <img src={URL.createObjectURL(image)} alt="Preview" className="mt-4 w-48 h-auto object-cover rounded-md border border-gray-200 shadow-sm" />}
        </div>

        {/* Chapters and Lectures */}
        <div className="p-4 border border-gray-200 rounded-lg bg-white space-y-4">
          <h2 className="text-xl font-bold text-gray-800">Course Content</h2>
          {chapters.map((chapter, chapterIndex) => (
            <div key={chapter.chapterId} className="border-t pt-4"> {/* FIX: Use unique chapterId for key */}
              <div className="flex justify-between items-center p-3 bg-gray-100 rounded-md">
                <div className="flex items-center font-medium">
                  <img onClick={() => handleChapter('toggle', chapter.chapterId)} className={`mr-3 cursor-pointer transition-transform duration-300 ${chapter.collapsed && "-rotate-90"}`} src={assets.dropdown_icon} width={14} alt="Toggle" />
                  {/* FIX: Changed `chapter.title` to `chapter.chapterTitle` */}
                  <span> {chapterIndex + 1}. {chapter.chapterTitle} </span>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-sm text-gray-600">
                    {chapter.chapterContent.length} Lectures
                  </span>
                  <img onClick={() => handleChapter('remove', chapter.chapterId)} src={assets.cross_icon} className='cursor-pointer w-4 h-4' alt="Remove Chapter" />
                </div>
              </div>
              {!chapter.collapsed && (
                <div className="pl-8 pt-4 space-y-3">
                  {chapter.chapterContent.map((lecture, lectureIndex) => (
                    <div key={lecture.lectureId} className="flex justify-between items-center p-2 bg-gray-50 rounded"> {/* FIX: Use unique lectureId for key */}
                      <div className="text-sm">
                        <span className="font-medium"> {chapterIndex + 1}.{lectureIndex + 1} {lecture.lectureTitle} </span>
                        <span className="ml-4 text-gray-500"> {lecture.lectureDuration} mins -
                          {/* FIX: Corrected typo from `lecture.lectureURl` to `lecture.lectureUrl` */}
                          <a href={lecture.lectureUrl} target='_blank' rel="noopener noreferrer" className="text-indigo-600 hover:underline"> Link </a> -
                          {lecture.isPreviewFree ? " Free Preview" : " Paid Lecture"}
                        </span>
                      </div>
                      {/* FIX: Pass unique lectureId for removal, not index */}
                      <img onClick={() => handleLecture('remove', chapter.chapterId, lecture.lectureId)} src={assets.cross_icon} className='cursor-pointer w-4 h-4' alt="Remove Lecture" />
                    </div>
                  ))}
                  {/* FIX: Cleaned up onClick and corrected `chapter.id` to `chapter.chapterId` */}
                  <div
                    onClick={() => handleLecture('add', chapter.chapterId)}
                    className="flex items-center gap-2 text-indigo-600 hover:text-indigo-800 font-medium cursor-pointer p-2 rounded-md hover:bg-indigo-50 transition-colors w-max"
                  >
                    <img src={assets.add_icon} className="w-5 h-5" alt="Add Icon" />
                    <span>Add Lecture</span>
                  </div>
                </div>
              )}
            </div>
          ))}

          <div onClick={() => handleChapter('add')} className="mt-4 p-3 text-center border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:bg-gray-100 cursor-pointer transition">
            Add Chapter
          </div>

          {/* Popup for adding a lecture */}
          {showPopUp && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
              <div className="bg-white p-8 rounded-lg shadow-2xl w-full max-w-lg space-y-6 relative">
                <h2 className="text-2xl font-bold text-gray-900">
                  Add Lecture
                </h2>
                <div className="flex flex-col gap-2">
                  <p className="font-semibold text-gray-700">Lecture Title </p>
                  <input
                    type='text'
                    value={lectureDetails.lectureTitle}
                    className='w-full p-3 border border-gray-300 rounded-md'
                    onChange={(e) => setLectureDetails({ ...lectureDetails, lectureTitle: e.target.value }
                    )} />
                </div>
                <div className="flex flex-col gap-2">
                  <p className="font-semibold text-gray-700">Lecture Duration </p>
                  <input
                    type='number'
                    value={lectureDetails.lectureDuration}
                    className='w-full p-3 border border-gray-300 rounded-md'
                    onChange={(e) => setLectureDetails({ ...lectureDetails, lectureDuration: e.target.value }
                    )} />
                </div>
                <div className="flex flex-col gap-2">
                  <p className="font-semibold text-gray-700">Lecture URL </p>
                  <input
                    type='text'
                    value={lectureDetails.lectureUrl}
                    className='w-full p-3 border border-gray-300 rounded-md'
                    onChange={(e) => setLectureDetails({ ...lectureDetails, lectureUrl: e.target.value }
                    )} />
                </div>
                <div className="flex items-center gap-3">
                  <p className="font-semibold text-gray-700">Is Preview Free</p>
                  {/* FIX: Added `checked` prop and an `onChange` that uses `e.target.checked` */}
                  <input
                    type='checkbox'
                    checked={lectureDetails.isPreviewFree}
                    className='h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500'
                    onChange={(e) => setLectureDetails({ ...lectureDetails, isPreviewFree: e.target.checked })}
                  />
                </div>

                <button
                  type="button"
                  onClick={addLecture}
                  className="w-full bg-indigo-600 text-white font-bold py-3 px-4 rounded-md hover:bg-indigo-700 transition-colors">ADD</button>

                <img src={assets.cross_icon} alt="Close" onClick={() => setShowPopup(false)} className="absolute top-4 right-4 w-6 h-6 cursor-pointer" />
              </div>
            </div>
          )}
        </div>
        <button type="submit" className="bg-green-600 text-white font-bold py-3 px-8 rounded-lg hover:bg-green-700 transition-transform transform hover:scale-105 shadow-lg">
          ADD COURSE
        </button>
      </form>
    </div>
  )
}

export default AddCourse