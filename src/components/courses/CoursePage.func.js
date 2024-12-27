import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createCourse } from "../../redux/actions/courseActions";

export default function CoursesPage() {
  const dispatch = useDispatch();
  const courses = useSelector(state => state.courses);
  const [course, setCourse] = useState({ title: "" });

  const handleChange = event => {
    setCourse({ ...course, title: event.target.value });
  };

  const handleSubmit = event => {
    event.preventDefault();
    dispatch(createCourse(course));
  };

  return (
    <form onSubmit={handleSubmit()}>
      <h2>Courses</h2>
      <h4>Add Course</h4>
      <input type="text" onChange={handleChange()} value={course.title} />
      <input type="submit" value="Save" />
      {courses.map(course => (
        <div key={course.title}>{course.title}</div>
      ))}
    </form>
  );
}
