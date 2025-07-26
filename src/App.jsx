// import { BrowserRouter, Routes, Route } from 'react-router-dom';
// import Dashboard    from './components/Dashboard';
// import BlogList     from './components/BlogList';
// import BlogForm     from './components/BlogForm';
// import ProjectList  from './components/ProjectList';
// import ProjectForm  from './components/ProjectForm';
// import Messages     from './components/Messages';
// import ContactForm  from './components/ContactForm';


// export default function App() {
//   return (
//     <BrowserRouter>
//       <Routes>
//         <Route path="/" element={<Dashboard />} />

//         <Route path="/blogs" element={<BlogList />} />
//         <Route path="/blogs/new" element={<BlogForm />} />
//         <Route path="/blogs/edit/:id" element={<BlogForm />} />

//         <Route path="/projects" element={<ProjectList />} />
//         <Route path="/projects/new" element={<ProjectForm />} />
//         <Route path="/projects/edit/:id" element={<ProjectForm />} />

//         {/* <Route path="/messages" element={<Messages />} /> */}

//         <Route path="/contact" element={<ContactForm />} />
//         <Route path="/messages" element={<Messages />} />
//       </Routes>
//     </BrowserRouter>
//   );
// }


// src/App.jsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Dashboard   from './components/Dashboard';
import BlogList    from './components/BlogList';
import BlogForm    from './components/BlogForm';
import ProjectList from './components/ProjectList';
import ProjectForm from './components/ProjectForm';
import Messages    from './components/Messages';
import ContactForm from './components/ContactForm';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* public */}
        <Route path="/contact" element={<ContactForm />} />

        {/* admin */}
        <Route path="/" element={<Dashboard />} />
        <Route path="/blogs"         element={<BlogList />} />
        <Route path="/blogs/new"     element={<BlogForm />} />
        <Route path="/blogs/edit/:id" element={<BlogForm />} />
        <Route path="/projects"      element={<ProjectList />} />
        <Route path="/projects/new"  element={<ProjectForm />} />
        <Route path="/projects/edit/:id" element={<ProjectForm />} />
        <Route path="/messages"      element={<Messages />} />
      </Routes>
    </BrowserRouter>
  );
}
