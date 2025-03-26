import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import ReactPlayer from "react-player";
import { Checkbox } from "antd";
import {
  FaBook,
  FaChevronDown,
  FaChevronUp,
  FaFile,
  FaVideo,
} from "react-icons/fa";

const LectureView = () => {
  const { id_lesson } = useParams();
  const [lesson, setLesson] = useState(null);
  const [sections, setSections] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`http://localhost:3333/api/lessons/${id_lesson}`).then((res) => {
      console.log(res);
      setLesson(res.data);
    });
    axios.get("http://localhost:3333/api/sections").then((res) => {
      console.log(res);
      setSections(res.data);
    });
  }, [id_lesson]);

  const handleProgress = (progress) => {
    if (lesson && lesson.type_lesson === "video" && lesson.resource) {
      if (progress.playedSeconds >= progress.loadedSeconds - 10) {
        axios.post("http://localhost:3333/api/progress", {
          lesson_id: id_lesson,
          completed: 1,
        });
      }
    }
  };

  const [openSections, setOpenSections] = useState({});

  const toggleSection = (id) => {
    setOpenSections((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const getLessonIcon = (type) => {
    switch (type) {
      case "video":
        return <FaVideo className="text-gray-400" />;
      case "resource":
        return <FaBook className="text-ggray-400" />;
      default:
        return <FaFile className="text-gray-400" />;
    }
  };

  return (
    <div className="flex bg-gray-300 p-6 gap-4">
      <div style={{ flex: "70%" }}>
        {lesson && lesson.typeLesson === "video" ? (
          <>
            <ReactPlayer
              url={lesson.resource}
              controls
              // onProgress={handleProgress}
            />
          </>
        ) : (
          <a href={lesson?.resource} target="_blank" rel="noopener noreferrer">
            Ver recurso
          </a>
        )}
      </div>
      <div className="flex flex-col gap-3">
        {sections
          .sort((a, b) => a.position - b.position)
          .map((section) => {
            const isOpen = openSections[section.id] || false;
            const hasActiveLesson = section.lessons.some(
              (l) => l.id === id_lesson
            );

            return (
              <div
                key={section.id}
                className={`bg-white border rounded-lg p-3 shadow-md ${
                  hasActiveLesson
                    ? "border-blue-500 bg-blue-50"
                    : "border-gray-300"
                }`}
              >
                <div
                  className="flex justify-between items-center cursor-pointer"
                  onClick={() => toggleSection(section.id)}
                >
                  <h3 className="font-semibold">{section.title}</h3>
                  {isOpen ? (
                    <FaChevronUp className="text-gray-600" />
                  ) : (
                    <FaChevronDown className="text-gray-600" />
                  )}
                </div>

                {isOpen && (
                  <div className="mt-2 space-y-2">
                    {section.lessons.length > 0 ? (
                      section.lessons
                        .sort((a, b) => a.position - b.position)
                        .map((l) => (
                          <div
                            key={l.id}
                            className={`flex items-center gap-2 p-2 rounded-md cursor-pointer ${
                              l.id === id_lesson
                                ? "bg-blue-100 font-bold"
                                : "bg-white"
                            }`}
                            onClick={() => navigate(`/lectureview/${l.id}`)}
                          >
                            <Checkbox checked={l.completed} />
                            {getLessonIcon(l.typeLesson)}
                            <span>{l.title}</span>
                          </div>
                        ))
                    ) : (
                      <div className="text-sm">No hay lecciones</div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default LectureView;
