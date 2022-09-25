import { motion } from "framer-motion";
import { mdiInstagram, mdiEmailOutline, mdiLinkedin, mdiGithub } from "@mdi/js";
import Icon from "@mdi/react";

const Icons = () => {
    const list = {
        visible: {
            opacity: 1,
            transition: {
                duration: 1,
                staggerChildren: 0.1,
            },
        },
        hidden: {
            opacity: 0,
        },
    };

    const list2 = {
        visible: {
            opacity: 1,
        },
        hidden: {
            opacity: 0,
        },
    };
    return (
        <div className="flex items-center gap-4 mt-4 flex-wrap">
            <motion.div
                animate="visible"
                initial="hidden"
                variants={list}
                className="flex justify-center items-center gap-3"
            >
                <motion.a
                    variants={list2}
                    href="mailto:jadenhou19@gmail.com"
                    aria-label="Mail"
                    className="text-base-dark dark:text-base-light"
                >
                    <Icon
                        path={mdiEmailOutline}
                        size={1.2}
                        className="cursor-pointer"
                    />
                </motion.a>
                <motion.a
                    variants={list2}
                    href="https://github.com/InternetRamen"
                    aria-label="GitHub"
                    className="text-base-dark dark:text-base-light"
                >
                    <Icon
                        path={mdiGithub}
                        size={1.2}
                        className="cursor-pointer"
                    />
                </motion.a>
                <motion.a
                    variants={list2}
                    href="https://www.instagram.com/houjaden"
                    aria-label="Instagram"
                    className="text-base-dark dark:text-base-light"
                >
                    <Icon
                        path={mdiInstagram}
                        size={1.2}
                        className="cursor-pointer"
                    />
                </motion.a>
                <motion.a
                    variants={list2}
                    href="https://www.linkedin.com/in/jaden-hou-01215a235"
                    aria-label="LinkedIn"
                    className="text-base-dark dark:text-base-light"
                >
                    <Icon
                        path={mdiLinkedin}
                        size={1.2}
                        className="cursor-pointer"
                    />
                </motion.a>
                <motion.a
                    variants={list2}
                    href="/cv.pdf"
                    aria-label="CV"
                    className="text-lg text-base-dark dark:text-base-light"
                >
                    CV
                </motion.a>
            </motion.div>
        </div>
    );
};

export default Icons;
