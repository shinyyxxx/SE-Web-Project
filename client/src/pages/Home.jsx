import React from 'react'
import "./Home.css";

export default function Home() {
  return (
    <>
    <div className="background-container-home">
      <div className="topnav">
        <a className="active" href="#home">Home</a>
        <a href="#contact">Contact</a>
        <a href="#program">Program</a>
        <a href="#about">About</a>
      </div>
      <div id='home' className='context'>
        <h1>Software Engineering Program at KMITL</h1><br></br>
        <h2>Welcome to Excellence in Software Engineering Education</h2>
      </div>
      <div id='about' className='context'>
        <h3>About KMITL</h3>
        <p>King Mongkut&#39;s Institute of Technology Ladkrabang (KMITL) stands as a beacon of academic excellence in Thailand, known for its commitment to innovation, research, and fostering future leaders in technology. KMITL has a rich legacy of providing quality education and is at the forefront of technological advancements.</p><br></br>
        <h3>Embracing the Future: Software Engineering Program</h3>
        <p>The Software Engineering program at KMITL is designed to prepare students for the dynamic and ever-evolving field of software development. With a focus on both theoretical knowledge and hands-on practical skills, our program equips students with the tools they need to thrive in the fast-paced world of technology.</p><br></br>
        <h3>Program Highlights</h3>
        <p><u>Cutting-edge Curriculum</u>: Our curriculum is regularly updated to align with industry trends, ensuring that students are learning the most relevant and up-to-date technologies.<br></br><u>Experienced Faculty</u>: Learn from a distinguished faculty with extensive industry experience, providing valuable insights and mentorship.<br></br><u>Hands-on Learning</u>: Practical, hands-on projects are integrated into the curriculum, allowing students to apply theoretical knowledge in real-world scenarios. <br></br><u>Industry Collaboration</u>: We maintain strong ties with industry leaders, offering students opportunities for internships, industry projects, and networking events. <br></br> <u>State-of-the-Art Facilities</u>: Access modern labs and facilities equipped with the latest software and hardware, creating an optimal learning environment.</p><br></br>
        <h3>Career Opportunities</h3>
        <p>Upon graduation, Software Engineering students from KMITL are well-prepared for a variety of career paths, including: Software Developer Systems Analyst Database Administrator IT Consultant Project Manager</p><br></br>
        <h3>Admission Requirements</h3>
        <p>Prospective students are encouraged to review the admission requirements on our official website to ensure a smooth application process.</p><br></br>
        <h3>Join Us in Shaping the Future</h3>
        <p>At KMITL, we believe in nurturing not just students but future innovators and leaders. Join our Software Engineering program to embark on a transformative educational journey that will prepare you for a successful career in the dynamic world of technology.</p><br></br>
      </div>
      <div id='program' className='context'>
        <h2>B.Eng. in Software Engineering Program</h2><br></br>
        <p>TheB.Eng. in Software Engineering Programis a 4-year undergraduate program aiming at producing graduates who are capable of working confidently in the international software industry as well as pursuing postgraduate study and research in leading universities worldwide. The curriculum of the program is designed in accordance with the recent ACM/IEEE guideline for undergraduate curriculum in software engineering.</p><br></br>
        <h3>Program Structure</h3>
        <img src="../public/curlum.png" width={"80%"}></img>
        <h3>Year 1 and Year 2</h3>
        <p>In the first two years, the students will study basic courses in mathematics, computer science, and software engineering and develop their programming skills using various programming languages (including Python, C, C++, Java, etc.). Also, the students will be trained to communicate correctly and effectively. At the end of Year 2, every student is required to undertake an internship in a software company for 8 - 10 weeks. All the courses in the first two years will be held at the International College in the Bangkok Campus of KMITL.</p><br></br>
        <h3>Year 3 and Year 4 (KMITL)</h3>
        <p>In Year 3 and Year 4, the students will learn advanced topics in software engineering and important software development methodologies that are used in practice. The students will have opportunities to the apply the knowledge and skills they have acquired to conduct a team software project in Year 3 and a one-year research project in Year 4. Students entering Year 3 are required to take one of the following specializations:<br></br> <u>Enterprise Software Engineering</u> - Specializing inlarge and complex software for enterprises and distributed systems <br></br> <u>Internet of Things</u> - Specializing in the Internet of Things, including embedded and mobile systems <br></br> <u>Intelligent Systems</u> - Specializing in applications of artificial intelligence and data science, including machine learning and Big Data <br></br> The study plans for these three specializations differ in some required courses. Also the students are recommended to toe work on their senior projects that utilize the knowledge of their respective specializations.</p><br></br>
        <h3>Year 3 and Year 4 (KMITL-Glasgow Double-Degree Program)</h3>
        <p>The students joining the KMITL-Glasgow Double-DegreeProgram will take courses in Years 3 and 4 in the Software Engineering program at the School of Computing Science, University of Glasgow.</p><br></br>
        <h3>Year 3 and Year 4 (KMITL-Queensland Double-Degree Program)</h3>
        <p>The students joining the KMITL-Queensland Double-Degree Program will take courses in Years 3 and 4 in Software Engineering Program at the Faculty of Engineering, Architecture and Information Technology, University of Queensland.</p>    
      </div>
      <div id="contact" className='contacts'>
        <h2>Contact Us</h2><br></br>
        <p>Have a question,or just want to say hello? We'd love to hear from you! Feel free to reach out using below information, and our team will get back to you as soon as possible.</p><br></br>
        <p><b>Email: </b><a href="mailto:pr.kmitl@kmitl.ac.th">pr.kmitl@kmitl.ac.th</a></p><br></br>
        <p><b>Address: </b>King Mongkut's Institute of Technology Ladkrabang 1 Chalong Krung 1 Alley, Lat Krabang, Bangkok 10520, Thailand</p><br></br>
        <p><b>Phone: </b><a href='tel:023298099'>0 2329 8099</a></p>
        <br></br>
        <p>Thank you for connecting with us!</p>
      </div>
      </div>
    </>
  )
}
