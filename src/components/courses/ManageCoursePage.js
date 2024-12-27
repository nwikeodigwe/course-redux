import React, { useEffect, useState } from "react";
import CourseForm from "./CourseForm";
import { newCourse } from "../../../tools/mockData";
import { useSelector, useDispatch } from "react-redux";
import { loadAuthors } from "../../redux/actions/authorActions";
import { loadCourses, saveCourse } from "../../redux/actions/courseActions";
import { useParams } from "react-router-dom";
import Spinner from "../common/Spinner";
import { toast } from "react-toastify";

const ManageCoursePage = () => {
  const courses = useSelector(state => state.courses);
  const authors = useSelector(state => state.authors);
  const dispatch = useDispatch();
  const [course, setCourse] = useState(newCourse);
  const [saving, setSaving] = useState(false);
  const [errors, setErrors] = useState({});
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

  function formIsValid() {
    const { title, authorId, category } = course;
    const errors = {};

    if (!title) errors.title = "Title is required.";
    if (!authorId) errors.author = "Author is required";
    if (!category) errors.category = "Category is required";

    setErrors(errors);
    return Object.keys(errors).length === 0;
  }

  function handleSave(event) {
    event.preventDefault();
    if (!formIsValid) return;
    setSaving(true);
    dispatch(saveCourse(course))
      .then(() => {
        toast.success("Course saved.");
        history.push("/courses");
      })
      .catch(error => {
        setSaving(false);
        setErrors({ onSave: error.message });
      });
  }

  return authors.length === 0 || courses.length === 0 ? (
    <Spinner />
  ) : (
    <CourseForm
      authors={authors}
      course={course}
      onChange={handleChange}
      onSave={handleSave}
      saving={saving}
      errors={errors}
    />
  );
};

export default ManageCoursePage;
