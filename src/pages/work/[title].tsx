import React from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import { motion } from "framer-motion";
import { AllWork } from "@/components/work/lib/Data";
import Footer from "@/components/Footer";

const WorkItem = () => {
  const router = useRouter();
  const { title } = router.query;
  const workItem = AllWork.find((item) => item.title === title);
  const [nextWorkItem, setNextWorkItem] = React.useState<any>(null);

  React.useEffect(() => {
    const availableWork = AllWork.filter((item) => !item.comingSoon);

    const currentIndex = availableWork.findIndex(
      (item) => item.title === title
    );
    const nextIndex =
      currentIndex + 1 < availableWork.length ? currentIndex + 1 : 0;

    setNextWorkItem(availableWork[nextIndex]);
  }, [title]);

  return (
    <motion.div
      className="work-item-container"
      initial={{ opacity: 0, z: 100 }}
      animate={{ opacity: 1, z: 0 }}
      exit={{ opacity: 0, z: -100 }}
      transition={{ duration: 1, delay: 0.75 }}
    >
      {workItem ? (
        <div className="work-item-content">
          <div className="hero">
            <h1>{workItem.title}</h1>
            <div className="work-item-details">
              <div className="left">
                <h4>Role</h4>
                <p>{workItem.role}</p>
              </div>
              <div className="right">
                <h4>Category</h4>
                <p>{workItem.category.join(", ")}</p>
              </div>
            </div>
          </div>
          <div className="body-container">
            {workItem.url && (
              <motion.a
                className="view-btn"
                href={workItem.url}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, z: 100 }}
                animate={{ opacity: 1, z: 0 }}
                exit={{ opacity: 0, z: -100 }}
                transition={{ duration: 1, delay: 0.75 }}
              >
                View Project
              </motion.a>
            )}
            <Image
              src={workItem.featuredImg}
              alt={workItem.title}
              width={1920}
              height={1920}
            />
            {workItem.images.map((img) => (
              <Image
                key={img.id}
                src={img.src}
                alt={img.alt}
                width={1920}
                height={1920}
              />
            ))}
          </div>
        </div>
      ) : null}
      {nextWorkItem && (
        <div className="next-item-container">
          <div className="next-item-header">
            <p>Next case</p>
            <h1>{nextWorkItem.title}</h1>
          </div>
          <motion.div
            className="animation-container"
            initial={{
              opacity: 0,
              x: -50,
              scale: 1.01,
            }}
            whileInView={{
              opacity: 1,
              x: 0,
              scale: 1.02,
            }}
            transition={{ duration: 0.5, delay: 0.15, ease: "easeOut" }}
          >
            <button
              className="btn-transparent"
              onClick={() => router.push(`/work/${nextWorkItem.title}`)}
            >
              Next case
            </button>
          </motion.div>
        </div>
      )}
      <Footer />
    </motion.div>
  );
};

export default WorkItem;
