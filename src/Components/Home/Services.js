import "./Services.css";
import { useInView } from "react-intersection-observer";
import { motion } from "framer-motion";

// REACT ICONS
import { SiDjango, SiReact, SiNginx, SiPython } from "react-icons/si";
import { VscAzureDevops } from "react-icons/vsc";

function Services() {
  const [refH1, inViewH1] = useInView({
    threshold: 0.2,
  });

  const [refH3, inViewH3] = useInView({
    threshold: 0.2,
  });

  return (
    <div className="services">
      <motion.h1
        className=""
        ref={refH1}
        initial={{ y: -30, opacity: 0.2 }}
        animate={{
          y: inViewH1 ? 0 : -30,
          opacity: inViewH1 ? 1 : 0.2,
        }}
        transition={{ duration: 1.5 }}
      >
        SERVICES
      </motion.h1>
      <motion.h3
        ref={refH3}
        initial={{ y: -30, opacity: 0.2 }}
        animate={{
          y: inViewH3 ? 0 : -30,
          opacity: inViewH3 ? 1 : 0.2,
        }}
        transition={{ duration: 1.5 }}
      >
        My Exceptional and Premium Services
      </motion.h3>
      <div className="cards-top">
        <div className="services-card">
          <SiNginx className="services-icon" />
          <h2>Software Engineering</h2>
          <p>
            As a proficient skilled developer in developing complex web
            applications using modern decoupled architecture for both frontend
            and backend apps. Additionally I can develop backend for any type of
            software systems. I am also experienced in deploying modern
            applications on PVS or in shared hosting in the cloud.
          </p>
        </div>
        <div className="services-card">
          <VscAzureDevops className="services-icon" />
          <h2>DevSecOps</h2>
          <p>
            With the development of a Software now comes the second step of production grade configuration management and deployment with CI/CD pipelines called DevOps. I am a skilled DevOps engineer with using Terraform for IAC, Jenkins for CI/CD, AWS for the cloud servers and Openshift for the on-premises servers deployment and pipelines. 
          </p>
        </div>
        <div className="services-card">
          <SiReact className="services-icon" />
          <h2>React</h2>
          <p>
            I am Proficient in React, a powerful JavaScript UI library, I am
            specialed in developing seamless and responsive user interfaces.
            Leveraging React's component-based architecture, I excel in creating
            dynamic and efficient web applications, ensuring an optimal user
            experience with a keen eye for UI/UX design principles.
          </p>
        </div>
        <div className="services-card">
          <SiDjango className="services-icon" />
          <h2>Django</h2>
          <p>
            My proficiency and experties in django extends to implementing
            efficient backend business logic, RESTful APIs, and database
            management within the Django framework. With a strong foundation in
            Django's architecture, I excel in delivering high-quality,
            maintainable code that aligns with industry best practices
          </p>
        </div>
        <div className="services-card">
          <SiNginx className="services-icon" />
          <h2>Nginx</h2>
          <p>
            Skilled professional in Nginx, I excel in configuring robust web
            servers, optimizing performance, and ensuring secure, efficient
            content delivery. Proficient in load balancing, reverse proxy
            setups, and SSL/TLS implementation, I enhance web infrastructure for
            seamless user experiences.
          </p>
        </div>
        <div className="services-card">
          <SiPython className="services-icon" />
          <h2>Docker</h2>
          <p>
            As a Docker engineer, proficiently orchestrating containerized
            environments with precision. With a keen eye for optimization, i can
            expertly crafts scalable solutions, ensuring seamless deployment and
            management. As a skilled Docker engineer, i can consistently
            delivers robust, reliable infrastructure tailored to meet diverse
            business needs.
          </p>
        </div>
        <div className="services-card">
          <SiNginx className="services-icon" />
          <h2>Kubernetes</h2>
          <p>
            My Kubernetes skillset excels proficiently orchestrating
            containerized applications with precision. Navigates complex
            infrastructures, ensuring seamless deployment and scalability. My
            expertise lies in crafting resilient systems, optimize resource
            utilization and enhance performance. Ajmal Khan is the adept
            architect you need to streamline your Kubernetes environments.
          </p>
        </div>
        <div className="services-card">
          <SiNginx className="services-icon" />
          <h2>Oracle</h2>
          <p>
            My competency excels in Oracle provisioning, configuration, and
            optimization for scalable web application deployment. With strong
            DevSecOps skills, I can automate CI/CD pipelines, implements
            infrastructure as code (IaC) with Terraform, and ensures robust monitoring and
            logging setups for seamless operations.
          </p>
        </div>
        <div className="services-card">
          <SiNginx className="services-icon" />
          <p>
            <h2>DevSecOps and Openshift Administration</h2>
            <br />I am actively expanding my expertise in DevSecOps and Openshift administration, where i am preparing myself for CNCF CKS(certified kubernetes security specialist) certification and also implmenting and working as an Openshift administrator with the adoptation of new technologies and skills.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Services;
