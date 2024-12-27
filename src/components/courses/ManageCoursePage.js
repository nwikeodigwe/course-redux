import React, { useEffect, useState } from "react";
import CourseForm from "./CourseForm";
import { newCourse } from "../../../tools/mockData";
import { useSelector, useDispatch } from "react-redux";
import { loadAuthors } from "../../redux/actions/authorActions";
import { loadCourses, saveCourse } from "../../redux/actions/courseActions";
import { useParams, useNavigate } from "react-router-dom";

const ManageCoursePage = () => {
  const courses = useSelector(state => state.courses);
  const authors = useSelector(state => state.authors);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [course, setCourse] = useState(newCourse);
  const { slug } = useParams();

  useEffect(() => {
    if (courses.length === 0) {
      dispatch(loadCourses()).catch(error => {
        alert("Loading courses failed" + error);
      });
    } else {
      setCourse(courses.find(course => course.slug === slug) || newCourse);
    }
  }, [courses, slug]);

  useEffect(() => {
    !authors.length &&
      dispatch(loadAuthors()).catch(error => {
        alert("Loading authors failed" + error);
      });
  }, [authors]);

  function handleChange({ target }) {
    const { name, value } = target;
    setCourse(prevCourse => ({
      ...prevCourse,
      [name]: name === "authorId" ? parseInt(value, 10) : value
    }));
  }

  function handleSave(event) {
    event.preventDefault();
    dispatch(saveCourse(course)).then(() => navigate("/courses"));
  }

  return (
    <CourseForm
      authors={authors}
      course={course}
      onChange={handleChange}
      onSave={handleSave}
    />
  );
};

export default ManageCoursePage;
