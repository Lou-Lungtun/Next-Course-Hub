// "use client";
// import CounterDemo from "@/components/CounterDemo";
// import ButtonComponent from "@/components/ButtonComponent";
import type { Metadata } from "next";
import { courses } from "./data/coursesdata";
import CourseExplorer from "@/components/CourseExplorer";

export const metadata: Metadata = { 
  title: "รายวิชาทั้งหมด", 
};

export default function CoursesPage() {
  return (
    <main>
      
      {/* <ButtonComponent /><br />
      <CounterDemo /> */}
      <h1>รายวิชาทั้งหมด</h1>
      <CourseExplorer courses={courses} />
    </main>
  );
}
