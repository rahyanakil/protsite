// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import "./Projects.css";

const Projects = () => {
  const projects = [
    {
      id: 1,
      title: "Through Travels - A Travel Website",
      description:
        "Welcome to Through Travels, an exciting travel website.Through Travels React application, along with its backend built using Express and Node.js. The website offers a seamless travel booking experience, including payment gateways like Stripe, bKash, and Nagad.",
      features: [
        "Interactive Destination Exploration",
        "Multiple Payment Options",
        "Booking Engine",
        "Browse and search",
        "Real-time Itinerary Tracking",
        "User Authentication and Personalization",
      ],
      liveLink: "https://through-travels.web.app/",
      snapshots: [
        "https://i.ibb.co/qrM7GFH/banner-section.jpg",
        "https://i.ibb.co/HTNFJHT/category-section.jpg",
        "https://i.ibb.co/YctXV6d/Feedback-section.jpg",
        "https://i.ibb.co/rxg0rdf/footer.jpg",
        "https://i.ibb.co/LkB14S9/host-dashboard-added-place.jpg",
        "https://i.ibb.co/jDXWbBh/host-dashboard-adding-place.jpg",
        "https://i.ibb.co/c2VHF7P/host-dashboard-modify-update-added-place.jpg",
        "https://i.ibb.co/T2nt8zy/host-dashboard-notify-anyone-can-booked-host-place.jpg",
        "https://i.ibb.co/tB2P70X/login.jpg",
        "https://i.ibb.co/CK3xZcc/navbar.jpg",
        "https://i.ibb.co/pnVDXrf/payment-partner-section.jpg",
        "https://i.ibb.co/Db5485W/place-details-section-or-page.jpg",
        "https://i.ibb.co/Y3cjyCT/signup-section.jpg",
        "https://i.ibb.co/GWfyXqF/user-dashboard-booked-place.jpg",
        "https://i.ibb.co/LZ6HdzS/user-dashboard-rqst-to-hosting-place.jpg",
        "https://i.ibb.co/72xwyT0/user-visa-payment-on-booking.jpg",
      ],
    },
    {
      id: 2,
      title: "Culinary School - education platform",
      description:
        "Welcome to Taste & Learn Culinary School! We are dedicated to providing a comprehensive culinary education and igniting a passion for cooking. Our mission is to empower aspiring chefs with the skills, knowledge and necessary to excel in the world of gastronomy.",
      features: [
        "Culinary Workshops",
        "Global Gastronomic Experience",
        "Market Visits",
        "Culinary Competitions",
        "Recipe Adaptations",
        "Culinary Showcases",
        "Culinary Events",
      ],
      liveLink: "https://culinary-adventure.web.app",
      snapshots: [
        "https://i.ibb.co/d59TFgr/1.jpg",
        "https://i.ibb.co/6vXyMj4/2.jpg",
        "https://i.ibb.co/hDKnSmw/3.jpg",
        "https://i.ibb.co/d65Y6L7/4.jpg",
        "https://i.ibb.co/sKKhT9k/5.jpg",
        "https://i.ibb.co/WGbRdQS/6.jpg",
        "https://i.ibb.co/JjcKff2/7.jpg",
        "https://i.ibb.co/Z29ccF3/8.jpg",
        "https://i.ibb.co/4pbzdz6/9.jpg",
      ],
    },
    {
      id: 3,
      title: "Cuisine Chronicles - e commerce restaurant",
      description:
        "Cuisine Chronicles is a website that dedicated to showcasing the recipes of various chefs from Through  the world. Each section of the website is exclusively dedicated to one cuisine, featuring Through ecipes from top chefs of that particular cuisine and get the best deal .",
      features: [
        "Recipes from Top Chefs",
        "Dedicated Cuisine Sections",
        "Step-by-Step Instructions",
        "Search Functionality",
      ],
      liveLink: "https://cuisine-chronicles.web.app",
      snapshots: [
        "https://i.ibb.co/LY6QkdH/1.jpg",
        "https://i.ibb.co/dgTpdmW/2.jpg",
        "https://i.ibb.co/rbHfVMj/3.jpg",
        "https://i.ibb.co/Rvbf3RS/4.jpg",
        "https://i.ibb.co/4SDWm5k/5.jpg",
        "https://i.ibb.co/0scDCvB/6.jpg",
      ],
    },
    {
      id: 4,
      title: "MixxStore - e commerce baby sports shop",
      description:
        "MixxStore is a React-based project that serves as an online shop specializing in sports toys. This README file provides an overview of the project's features and includes the live site link and license information Through toy from top chefs of that particular ",
      features: [
        "Product Catalog",
        "Browse and search",
        "Shopping Cart",
        "Product Reviews",
      ],
      liveLink: "https://mixxstore-4a428.web.app",
      snapshots: [
        "https://i.ibb.co/F61wyX5/1.jpg",
        "https://i.ibb.co/Pmx5QRn/2.jpg",
        "https://i.ibb.co/0h2tVtm/3.jpg",
        "https://i.ibb.co/W3yBGxg/4.jpg",
        "https://i.ibb.co/zsCpS4L/5.jpg",
        "https://i.ibb.co/Hp4kfHP/7.jpg",
        "https://i.ibb.co/Vv99P5j/8.jpg",
        "https://i.ibb.co/MST003t/9.jpg",
      ],
    },
    // Add more projects here if needed
  ];

  const [selectedProject, setSelectedProject] = useState(null);

  const openModal = (project) => {
    setSelectedProject(project);
  };

  const closeModal = () => {
    setSelectedProject(null);
  };

  return (
    <>
      <h2 className="section__title waviy" id="projects">
        <span>P</span>
        <span>r</span>
        <span>o</span>
        <span>j</span>
        <span>e</span>
        <span>c</span>
        <span>t</span>
        <span>s</span>
      </h2>
      <span className="section__subtitle flipX">Explore my works</span>
      <div className="projects-container">
        {projects.map((project) => (
          <div className="project-card" key={project.id}>
            <h2>{project.title}</h2>
            <p>{project.description}</p>
            <button onClick={() => openModal(project)}>View Details</button>
          </div>
        ))}

        {selectedProject && (
          <div className="modal">
            <div className="modal-content">
              <h2>{selectedProject.title}</h2>
              <p>{selectedProject.description}</p>
              <ul>
                {" "}
                Features:
                {selectedProject.features.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
              <a
                href={selectedProject.liveLink}
                target="_blank"
                rel="noopener noreferrer"
              >
                Live Site
              </a>
              <div className="snapshot-gallery">
                {selectedProject.snapshots.map((snapshot, index) => (
                  <img
                    key={index}
                    src={snapshot}
                    alt={`Snapshot ${index + 1}`}
                  />
                ))}
              </div>
              <button onClick={closeModal}>
                <i className="bx bx-x"></i>
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Projects;
