"use client";
import React from "react";
import Image, { StaticImageData } from "next/image";
import Link from "next/link";
import { SiGithub } from "react-icons/si";
import { IoArrowForward } from "react-icons/io5";
import { motion } from "framer-motion";

// Import project images
import ParkViewDeviceFrames from "@/app/projects/images/parkviewproject/deviceframes.png";
import TasklyApp from "@/app/projects/images/taskly/tasklyapp.png";
import ResearchPaperThumbnail from "@/app/projects/images/researchpaper/thumb.png";
import StudyBudsOpenGraph from "@/app/projects/images/studybuds/opengraph.jpg";

interface Project {
  id: number;
  name: string;
  description: string;
  link?: string | null;
  githubLink?: string | null;
  languages: string[];
  images?: {
    main?: string | StaticImageData;
    logo?: string | StaticImageData;
    icon?: string | StaticImageData;
  } | null;
  backgroundColor?: string;
}

const projects: Project[] = [
  {
    id: 0,
    name: "Real Estate Site",
    description:
      "A website developed through research-driven design and development. Focuses on user experience, SEO optimization, and performance using NextJS.",
    link: "https://parkview.nederal.com",
    languages: ["NextJS", "TailwindCSS", "TypeScript"],
    images: {
      main: ParkViewDeviceFrames
    },
    backgroundColor: "#174940"
  },
  {
    id: 1,
    name: "Research Paper",
    description:
      "A research paper on the topic 'Optimizing Pathfinding in Urban Environments: A Dynamic Algorithm Approach for Block-Based and Organic City Layouts' ",
    link: "https://cdn.nederal.com/files/research.pdf",
    languages: ["Python", "LaTeX"],
    images: {
      main: ResearchPaperThumbnail
    }
  },
  {
    id: 2,
    name: "Taskly",
    description:
      "An open-source desktop Tauri application for task management allowing users to create, edit, and organize daily tasks and projects.",
    link: "https://taskist.app",
    githubLink: "https://github.com/oliver-nederal/taskist-desktop",
    languages: ["React", "Tauri", "TailwindCSS"],
    backgroundColor: "#2d3748",
    images: {
      main: TasklyApp
    }
  },
];

const ProjectCard: React.FC<{ project: Project; index: number }> = ({
  project,
  index
}) => {
  const {
    name,
    description,
    link,
    githubLink,
    languages,
    images,
    backgroundColor
  } = project;

  return (
    <motion.div
      className="group flex flex-col h-full relative z-10"
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{
        duration: 0.6,
        delay: 0.1 * index,
        ease: [0.22, 1, 0.36, 1]
      }}
      whileHover={{ y: -6, zIndex: 20 }}
    >
      <motion.div
        className="rounded-xl overflow-hidden shadow-sm hover:shadow-md flex flex-col h-full relative border border-neutral-200 dark:border-neutral-700/50"
        whileHover={{ boxShadow: "0 8px 30px rgba(0,0,0,0.12)" }}
        transition={{ duration: 0.3 }}
      >
        {/* Full card background image */}
        {images?.main && (
          <div className="w-full h-full absolute inset-0 z-0">
            <motion.div
              className="absolute inset-0 z-0"
              style={{ backgroundColor: backgroundColor || "#1f2937" }}
              initial={{ opacity: 0.8 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 * index }}
            ></motion.div>
            <motion.div
              className="relative z-0 h-full"
              whileHover={{ scale: 1.03 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              <Image
                src={images.main}
                alt={`${name} preview`}
                fill
                sizes="(max-width: 640px) 100vw, 50vw"
                className="object-cover relative z-0"
                loading="lazy"
                quality={90}
              />
              {/* Overlay gradient for better text readability */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent z-10"></div>
            </motion.div>
          </div>
        )}

        {/* Project Information - Overlaid on image */}
        <motion.div
          className="p-8 flex flex-col h-full justify-end relative z-20"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.15 * index + 0.2 }}
        >
          <div className="mt-auto">
            <motion.h2
              className="text-2xl font-semibold mb-3 text-white drop-shadow-md"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 * index + 0.1 }}
            >
              {name}
            </motion.h2>

            <motion.p
              className="text-neutral-200 leading-relaxed mb-6 max-w-prose drop-shadow-md"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 * index + 0.2 }}
            >
              {description}
            </motion.p>

            {/* Technology Tags */}
            <div className="flex flex-wrap gap-2 mb-6">
              {languages.map((tech, techIndex) => (
                <motion.span
                  key={techIndex}
                  className="px-3 py-1 text-sm rounded-full bg-white/20 backdrop-blur-sm text-white"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{
                    duration: 0.4,
                    delay: 0.2 * index + 0.3 + 0.05 * techIndex
                  }}
                  whileHover={{
                    scale: 1.05,
                    backgroundColor: "rgba(255, 255, 255, 0.3)"
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  {tech}
                </motion.span>
              ))}
            </div>

            {/* Action Links */}
            <motion.div
              className="flex flex-wrap gap-6"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 * index + 0.4 }}
            >
              {link && (
                <motion.div whileHover={{ x: 3 }} whileTap={{ scale: 0.97 }}>
                  <Link
                    href={link}
                    className="inline-flex items-center group/link text-white hover:text-neutral-200 transition-colors"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <span className="border-b border-white/40 group-hover/link:border-white/60 transition-colors">
                      Open
                    </span>
                    <motion.div
                      className="ml-2"
                      animate={{ x: 0 }}
                      whileHover={{ x: 3 }}
                      transition={{ duration: 0.2 }}
                    >
                      <IoArrowForward />
                    </motion.div>
                  </Link>
                </motion.div>
              )}

              {githubLink && (
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.97 }}
                >
                  <Link
                    href={githubLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center group/link text-white hover:text-neutral-200 transition-colors"
                  >
                    <SiGithub className="mr-2" />
                    <span className="border-b border-white/40 group-hover/link:border-white/60 transition-colors">
                      Source Code
                    </span>
                  </Link>
                </motion.div>
              )}
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

const ProjectsPage: React.FC = () => {
  return (
    <div className="min-h-screen pt-[90px] pb-[60px] px-6 text-neutral-900 dark:text-white relative overflow-hidden">
      <motion.div
        className="w-full relative z-20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <div className="grid sm:grid-cols-2 grid-cols-1 gap-6 md:gap-8 relative z-10">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              className="pt-4 h-[500px] sm:h-[550px] md:h-[500px] lg:h-[550px] relative"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.6,
                delay: 0.1 * index,
                ease: "easeOut"
              }}
            >
              <ProjectCard project={project} index={index} />
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default ProjectsPage;
