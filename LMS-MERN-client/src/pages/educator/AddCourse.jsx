import React, { useEffect, useRef, useState } from 'react'
import uniqid from 'uniqid'
import Quill from 'quill'
import { assets } from '../../assets/assets'



function AddCourse() {

  const quillRef = useRef(null)
  const editorRef = useRef(null)
  //  note : 
  //  const editorRef = useRef(null);
  //  This ref is attached to a DOM element in JSX:
  //  <div ref={editorRef}></div>
  //  After React renders, editorRef.current will point to the actual <div> element in the DOM.
  //  That’s the container where Quill will mount itself.
  //  (Quill is not a React component, it’s a JS library that needs a real DOM element to work on.)
  //  useRef is persistent between renders but does not cause re-renders when updated.
  //  const quillRef = useRef(null);
  //  This ref is used to store the Quill instance itself.

  const [courseTitle, setCourseTitle] = useState('')
  const [coursePrice, setCoursePrice] = useState(0)
  const [discount, setDiscount] = useState(0)
  const [image, setiImage] = useState(null)
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

  return (

    <div>
     <form>
      <div>
        <p>Course Title</p>
         {/* This is a controlled input field */}
        <input 
        onChange={e => setCourseTitle(e.target.value)}
        value={courseTitle}
        type='text'
        placeholder='type here'
        />
      </div>
      <div>
        <p>Course Description : </p>
        <div ref={editorRef} ></div>
        {/* editorRef points to the <div> where Quill should mount. */}
      </div>
      <div>
        <p>Course Price</p>
        <input 
        onChange={e => setCoursePrice(e.target.value)}
        value={coursePrice}
        placeholder='0'
        type='number'
        />
      </div>
      <div>
        <p>Coruse Thumbnail</p>
        <label htmlFor='thumbnailimage'>
        <img src={assets.file_upload_icon}></img>
        <input 
        type='file' 
        id='thumbnailimage' 
        onChange={e => (
          setiImage(e.target.files[0])
        )}
        accept='image/*'
        hidden />
        {/* preview */}
        </label>
        {image && <img src={URL.createObjectURL(image)} alt="Preview" />}
      </div>

     </form>
       
    </div>
  )
}

export default AddCourse