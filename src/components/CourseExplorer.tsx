"use client";

import { useState, type ChangeEvent } from "react";
import type { Course } from "@/types/course";
import CourseCard from "./CourseCard";

type CourseExplorerProps = {
  courses: Course[];
};

type CourseFilter = "all" | "open" | "closed" | "favorites";

export default function CourseExplorer({ courses }: CourseExplorerProps) {
  const [keyword, setKeyword] = useState("");
  const [activeFilter, setActiveFilter] = useState<CourseFilter>("all");
  const [favoriteIds, setFavoriteIds] = useState<number[]>([]);

  function handleKeywordChange(event: ChangeEvent<HTMLInputElement>) {
    setKeyword(event.target.value);
  }

  function handleToggleFavorite(id: number) {
    setFavoriteIds((prevIds) =>
      prevIds.includes(id)
        ? prevIds.filter((favoriteId) => favoriteId !== id)
        : [...prevIds, id]
    );
  }

  function handleClearFilters() {
    setKeyword("");
    setActiveFilter("all");
  }

  const searchText = keyword.trim().toLowerCase();

  const visibleCourses = courses.filter((course) => {
    const matchesKeyword =
      course.title.toLowerCase().includes(searchText) ||
      course.code.toLowerCase().includes(searchText);

    const matchesFilter =
      activeFilter === "all" ||
      (activeFilter === "open" && course.isOpen) ||
      (activeFilter === "closed" && !course.isOpen) ||
      (activeFilter === "favorites" && favoriteIds.includes(course.id));

    return matchesKeyword && matchesFilter;
  });

  const filters: { value: CourseFilter; label: string }[] = [
    { value: "all", label: "ทั้งหมด" },
    { value: "open", label: "เปิดลงทะเบียน" },
    { value: "closed", label: "ปิดลงทะเบียน" },
    { value: "favorites", label: `รายการโปรด (${favoriteIds.length})` },
  ];

  return (
    <div className="courseExplorer">
      <section className="courseToolbar" aria-label="เครื่องมือค้นหารายวิชา">
        <label className="courseSearch">
          <span className="searchIcon" aria-hidden="true">⌕</span>
          <span className="srOnly">ค้นหารายวิชา</span>
          <input
            type="search"
            value={keyword}
            onChange={handleKeywordChange}
            placeholder="ค้นหาชื่อวิชาหรือรหัสวิชา"
          />
          {keyword && (
            <button
              className="clearSearchButton"
              type="button"
              onClick={() => setKeyword("")}
              aria-label="ล้างคำค้นหา"
            >
              ×
            </button>
          )}
        </label>

        <div className="courseFilters" aria-label="กรองสถานะรายวิชา">
          {filters.map((filter) => (
            <button
              key={filter.value}
              className="filterButton"
              type="button"
              aria-pressed={activeFilter === filter.value}
              onClick={() => setActiveFilter(filter.value)}
            >
              {filter.label}
            </button>
          ))}
        </div>
      </section>

      <div className="courseResultsSummary" aria-live="polite">
        <p>พบ <strong>{visibleCourses.length}</strong> จาก {courses.length} รายวิชา</p>
        <p>บันทึกรายการโปรดแล้ว <strong>{favoriteIds.length}</strong> วิชา</p>
      </div>

      {visibleCourses.length === 0 ? (
        <section className="courseEmptyState">
          <span aria-hidden="true">⌕</span>
          <h2>ไม่พบรายวิชา</h2>
          <p>ลองเปลี่ยนคำค้นหาหรือตัวกรอง แล้วค้นหาอีกครั้ง</p>
          <button className="button emptyStateButton" type="button" onClick={handleClearFilters}>
            ล้างการค้นหาและตัวกรอง
          </button>
        </section>
      ) : (
        <section className="courseGrid" aria-label="ผลการค้นหารายวิชา">
          {visibleCourses.map((course) => (
            <CourseCard
              key={course.id}
              course={course}
              isFavorite={favoriteIds.includes(course.id)}
              onToggleFavorite={handleToggleFavorite}
            />
          ))}
        </section>
      )}
    </div>
  );
}
