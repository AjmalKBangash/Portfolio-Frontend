import "./Home.css";
import "./Navbar.css";
import Navbar from "./Navbar";
import Services from "./Services";
import Testemonials from "./Testemonials";
import FavProjectSnap from "./FavProjectSnap";
import DownloadPDF from "../PortfolioWork/DownloadPDF";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { showNav, activeNavLink } from "../../Store/store";
import axios from "axios";
import { useInView } from "react-intersection-observer";
import { motion, AnimatePresence } from "framer-motion";

// REACT ICONS
import { FaInstagram } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
import { FaDocker } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";

import SkillsTool from "./SkillsTool";
import Snapshots from "./Snapshots";
import Blogs from "./Blogs";
import Contact from "./Contact";
import Footer from "./Footer";
// import axios from "axios";

let skillToolss = [
  {
    skill_date: "2024-03-10",
    skill: "Javascript",
    per: "82",
  },
  {
    skill_date: "2024-03-11",
    skill: "Python",
    per: "84",
  },
  {
    skill_date: "2024-03-12",
    skill: "React",
    per: "82",
  },
  {
    skill_date: "2024-03-13",
    skill: "Django",
    per: "84",
  },
  {
    skill_date: "2024-03-13",
    skill: "django-rest-framework",
    per: "84",
  },
  {
    skill_date: "2024-03-13",
    skill: "Rest APIs",
    per: "84",
  },
  {
    skill_date: "2024-03-14",
    skill: "PostgreSQL",
    per: "67",
  },
  {
    skill_date: "2024-03-15",
    skill: "MySQL",
    per: "67",
  },
];

let skillToolsDevOpss = [
  {
    skill_date: "2024-03-10",
    skill: "Docker",
    per: 93,
  },
  {
    skill_date: "2024-03-11",
    skill: "Kubernetes",
    per: 95,
  },
  {
    skill_date: "2024-03-12",
    skill: "Red-Hat Openshift",
    per: 79,
  },
  {
    skill_date: "2024-03-12",
    skill: "Red-Hat Openshift ACM",
    per: 79,
  },
  {
    skill_date: "2024-03-12",
    skill: "Red-Hat Openshift ACS",
    per: 79,
  },
  {
    skill_date: "2024-03-12",
    skill: "Red-Hat Openshift Data foundation",
    per: 79,
  },
  {
    skill_date: "2024-03-13",
    skill: "Bash Scripting",
    per: 75,
  },
  {
    skill_date: "2024-03-15",
    skill: "Scripting with Python",
    per: 80,
  },
  {
    skill_date: "2024-03-16",
    skill: "Podman",
    per: 93,
  },
  {
    skill_date: "2024-03-17",
    skill: "Trivy",
    per: 93,
  },
  {
    skill_date: "2024-03-18",
    skill: "Terraform",
    per: 80,
  },
  {
    skill_date: "2024-03-19",
    skill: "Prometheus_Grafana",
    per: 70,
  },
  {
    skill_date: "2024-03-20",
    skill: "Git_Github",
    per: 80,
  },
  {
    skill_date: "2024-03-21",
    skill: "Jenkins",
    per: 80,
  },
  {
    skill_date: "2024-03-22",
    skill: "CI/CD",
    per: 85,
  },
  {
    skill_date: "2024-03-23",
    skill: "Nexus",
    per: 71,
  },
  {
    skill_date: "2024-03-23",
    skill: "Checkov",
    per: 73,
  },
  {
    skill_date: "2024-04-23",
    skill: "SonarQube",
    per: 76,
  },
];
// let skillToolsCloudd = [
//   {
//     skill_date: "2024-03-10",
//     skill: "AWS VPC",
//     per: 77,
//   },
//   {
//     skill_date: "2024-03-17",
//     skill: "AWS IAM",
//     per: 79,
//   },
//   {
//     skill_date: "2024-03-13",
//     skill: "AWS VPS",
//     per: 80,
//   },
//   {
//     skill_date: "2024-03-14",
//     skill: "AWS Lambda",
//     per: 10,
//   },
//   {
//     skill_date: "2024-03-15",
//     skill: "AWS EKS",
//     per: 80,
//   },
//   {
//     skill_date: "2024-03-17",
//     skill: "AWS ECS",
//     per: 95,
//   },
//   {
//     skill_date: "2024-03-16",
//     skill: "AWS S3 ",
//     per: 80,
//   },
//   {
//     skill_date: "2024-03-17",
//     skill: "AWS RDS",
//     per: 80,
//   },
// ];
let skillToolsCloudd = [
  {
    skill_date: "2024-03-10",
    skill: "OCI VCN (Virtual Cloud Network)", // AWS VPC equivalent
    per: 77,
  },
  {
    skill_date: "2024-03-17",
    skill: "OCI IAM (Identity & Access Management)", // AWS IAM equivalent
    per: 79,
  },
  {
    skill_date: "2024-03-13",
    skill: "OCI Compute (VMs)", // AWS EC2 / VPS equivalent
    per: 80,
  },
  {
    skill_date: "2024-03-14",
    skill: "OCI Functions", // AWS Lambda equivalent
    per: 10,
  },
  {
    skill_date: "2024-03-15",
    skill: "OCI OKE (Container Engine for Kubernetes)", // AWS EKS equivalent
    per: 80,
  },
  {
    skill_date: "2024-03-17",
    skill: "OCI Container Instances / OKE Services", // AWS ECS equivalent
    per: 95,
  },
  {
    skill_date: "2024-03-16",
    skill: "OCI Object Storage", // AWS S3 equivalent
    per: 80,
  },
  {
    skill_date: "2024-03-17",
    skill: "OCI Autonomous Database / OCI Database Service", // AWS RDS equivalent
    per: 80,
  },
];


function Home() {
  const [skillTools, setSkillTools] = useState(skillToolss);
  const [skillToolsDevOps, setSkillToolsDevOps] = useState(skillToolsDevOpss);
  const [skillToolsCloud, setSkillToolsCloud] = useState(skillToolsCloudd);
  const dispatch = useDispatch();
  const [ref, inView] = useInView();
  // const [refProfile, inViewProfile] = useInView({
  //   threshold: 0.2, // Trigger animation when 20% of the element is in view
  // });
  const [refAbout, inViewAbout] = useInView({
    // triggerOnce: true, // Animation triggers only once
    threshold: 0.2, // Trigger animation when 20% of the element is in view
  });
  const [refPro, inViewPro] = useInView({
    threshold: 0.3, // Trigger animation when 30% of the element is in view
  });
  //////////////////////////////////  THIS IS WHERE WHEN SCROLLING Y AXIS SECTIONOFFSETS WILL UPATE ACCORDING TO GIVEN IDS (SECTIONS)
  useEffect(() => {
    const handleScroll = () => {
      const sectionOffsets = {
        home: document.getElementById("home-section").offsetTop, // Adjust this value if needed
        about: document.getElementById("about-section").offsetTop,
        // portfolio: document.getElementById("portfolio-section").offsetTop,
        services: document.getElementById("services-section").offsetTop,
        snapshots: document.getElementById("snapshots-section").offsetTop,
        blogs: document.getElementById("blogs-section").offsetTop,
        contact: document.getElementById("contact-section").offsetTop,
        // Add more sections as needed
      };

      const scrollPosition = window.scrollY;
      let activeSection = "home";

      // Determine the active section based on the scroll position
      Object.entries(sectionOffsets).forEach(([section, offset]) => {
        if (scrollPosition >= offset) {
          activeSection = section;
        }
      });

      // Update the activeNavLink state
      dispatch(activeNavLink(activeSection));
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  useEffect(() => {
    if (!inView) {
      // Perform your action when the element is out of view
      dispatch(showNav(false));
    } else {
      // Perform your action when the element is out of view
      dispatch(showNav(true));
    }
  }, [inView]);
  // FOR SOFTWARE ENGINEERING
  useEffect(() => {
    axios
      .get("portfolio/skill-tools/")
      .then((res) => {
        setSkillTools(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  // FOR DevOps ENGINEERING
  useEffect(() => {
    axios
      .get("portfolio/skill-tools-devops/")
      .then((res) => {
        setSkillToolsDevOps(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  // FOR CLOUD COMPUTING
  useEffect(() => {
    axios
      .get("portfolio/skill-tools-cloud/")
      .then((res) => {
        setSkillToolsCloud(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <>
      <div id="home-section"></div>
      <Navbar />
      <div
        class="background-img"
        ref={ref}
        // style={{ backgroundImage: "/images/back-img.png" }}
      >
        <div className="background-img-clr">
          <div className="background-img-div">
            <AnimatePresence>
              <motion.div
                ref={refPro}
                initial={{ y: -100, opacity: 0 }}
                animate={{
                  y: inViewPro ? 0 : -100,
                  opacity: inViewPro ? 1 : 0,
                }}
                exit={{ y: -100, opacity: 0 }}
                transition={{ duration: 2.5 }}
              >
                <img src="images/Ajay.png" className="profile-img "></img>
                <h1 className=" center-items">AJMAL KHAN</h1>
                <div className=" center-items">
                  I am a Software and DevSecOps Engineer
                </div>
                <div className="social-icons">
                  <FaLinkedin
                    className="social-icons-each"
                    onClick={() =>
                      window.open(
                        "https://www.linkedin.com/in/ajmal-khan-620356181/",
                        "_blank"
                      )
                    }
                  />
                  <FaInstagram
                    onClick={() =>
                      window.open(
                        "https://www.instagram.com/ajmalbangash/",
                        "_blank"
                      )
                    }
                    className="social-icons-each"
                  />

                  <FaGithub
                    className="social-icons-each"
                    onClick={() =>
                      window.open(" https://github.com/AjmalKBangash", "_blank")
                    }
                  />
                  <FaDocker
                    onClick={() =>
                      window.open(
                        "https://hub.docker.com/u/ajmalkhanbangash",
                        "_blank"
                      )
                    }
                    className="social-icons-each"
                  />
                </div>
              </motion.div>
            </AnimatePresence>
            <div>
              <DownloadPDF />
              <motion.span
                className="two-btns-on-back-img"
                onClick={() =>
                  document
                    .getElementById("contact-section")
                    .scrollIntoView({ behavior: "smooth" })
                }
                ref={refPro}
                initial={{ x: 150, opacity: 0 }}
                animate={{ x: inViewPro ? 0 : 150, opacity: inViewPro ? 1 : 0 }}
                exit={{ x: 150, opacity: 0 }}
                transition={{ duration: 2 }}
              >
                Contact Me
              </motion.span>
            </div>
          </div>
        </div>
      </div>
      <div className="home-container">
        <br />
        <br />
        <br />
        <motion.div
          className="sections-backround"
          ref={refAbout}
          initial={{ y: -58, opacity: 0.2 }}
          animate={{
            y: inViewAbout ? 0 : -58,
            opacity: inViewAbout ? 1 : 0.2,
          }}
          transition={{ duration: 1.2 }}
        >
          <div className="about" id="about-section">
            <h1>ABOUT</h1>
            <h3>Career Experience and Specialized Skills</h3>
            <br />
            <br />
            <h4>Technical Expertise:</h4>
            <p>As a DevSecOps Engineer with 4+ years of experience, I specialize in end-to-end application lifecycle management—from developing scalable backend systems (Django, REST APIs) and dynamic frontends (React/JavaScript) to deploying secure, high-availability infrastructure on cloud (Oracle/Azure) and on-premises (OpenShift). My technical proficiency spans Kubernetes/OpenShift cluster deployment, Infrastructure-as-Code (Terraform), and CI/CD pipeline automation (Jenkins), with rigorous attention to security via Trivy, Checkov, and GitLeaks integration. I optimize performance through load testing (Locust), monitoring (Prometheus/Grafana), and database tuning (PostgreSQL, Redis), ensuring robust solutions aligned with DevSecOps principles.</p>
            <br />
            <h4>DevOps & Cloud Capabilities:</h4>
            <p>I architect fault-tolerant systems using containerization (Docker/Podman) and orchestration tools (Kubernetes/kubeadm), with expertise in configuring reverse proxies (Nginx) and managing hybrid cloud environments. My work includes designing secure VPCs, automating Oracle OKE deployments, and implementing zero-downtime strategies for Django applications. Certified in Kubernetes (CKA/CKS) and OpenShift (RHCOA), I bridge development and operations by enforcing ITIL-inspired change management, infrastructure security, and AI-driven observability—all while maintaining compliance with Linux FHS standards and optimizing costs through centralized monitoring.</p>
            <p>
              Explore my portfolio to discover the projects that showcase my
              commitment to delivering innovative solutions and my journey
              towards mastering modern technologies in the ever-evolving
              landscape of software and DevOps Engineering.
            </p>
          </div>
          <h2 className="three-engineers">Software Engineering</h2>
          <div className="skillful-tools">
            {skillTools.results ?
              skillTools.results?.map((skillper, index) => {
                return (
                  <SkillsTool
                    data={{ skill: skillper.skill, per: skillper.per }}
                  />
                );
              }):
              skillTools.map((skillper, index) => {
                return (
                  <SkillsTool
                    data={{ skill: skillper.skill, per: skillper.per }}
                  />
                );
              })
              
              }
            {/* <div>
              <div className="skillful-tools-name-per">
                <span>React</span>
                <span>80%</span>
              </div>
              <div className="skillful-tools-grey">
                <div className="skillful-tools-orange"></div>
              </div>
            </div> */}
          </div>
          <h2 className="three-engineers">DevSecOps Engineering</h2>
          <div className="skillful-tools">
            {skillToolsDevOps.results ?
              skillToolsDevOps.results?.map((skillper, index) => {
                return (
                  <SkillsTool
                    data={{ skill: skillper.skill, per: skillper.per }}
                  />
                );
              }):
              skillToolsDevOps?.map((skillper, index) => {
                return (
                  <SkillsTool
                    data={{ skill: skillper.skill, per: skillper.per }}
                  />
                );
              })
              }
            {/* <div>
              <div className="skillful-tools-name-per">
                <span>React</span>
                <span>80%</span>
              </div>
              <div className="skillful-tools-grey">
                <div className="skillful-tools-orange"></div>
              </div>
            </div> */}
          </div>
          <h2 className="three-engineers">Cloud Computing</h2>
          <div className="skillful-tools">
            {skillToolsCloud.results ?
              skillToolsCloud.results?.map((skillper, index) => {
                return (
                  <SkillsTool
                    data={{ skill: skillper.skill, per: skillper.per }}
                  />
                );
              }):
              skillToolsCloud?.map((skillper, index) => {
                return (
                  <SkillsTool
                    data={{ skill: skillper.skill, per: skillper.per }}
                  />
                );
              })
              }
            {/* <div>
              <div className="skillful-tools-name-per">
                <span>React</span>
                <span>80%</span>
              </div>
              <div className="skillful-tools-grey">
                <div className="skillful-tools-orange"></div>
              </div>
            </div> */}
          </div>
        </motion.div>
        <br />
        <br />
        <br />
        <div className="sections-backround" id="services-section">
          <Services />
        </div>
        <br />
        <br />
        <br />
        <div id="snapshots-section">
          <Snapshots />
        </div>
        <br />
        <br />
        <br />
        <div
          className="sections-backround"
          id="testemonials-section"
          style={{ padding: "25px 0px" }}
        >
          <Testemonials />
        </div>
        <br />
        <br />
        <br />
        <div className="sections-backround" id="blogs-section">
          <Blogs />
        </div>
        <br />
        <br />
        <br />
        <div
          className="sections-backround"
          id="contact-section"
          style={{ padding: "25px 0px" }}
        >
          <Contact />
        </div>
        <br />
        <br />
        <FavProjectSnap />
        <br />
        <div id="footer-section"></div>
      </div>
      <Footer />
    </>
  );
}

export default Home;
