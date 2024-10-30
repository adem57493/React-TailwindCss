import { useRef, useState } from 'react';
import axios from 'axios';
import articleImg from './assets/no-projects.png';
import Modal from './components/Modal';
import Articles from './components/Article';
import DeleteConfirmation from './components/DeleteConfirmation';
import NewProject from './components/NewProject';
import NoProjectSelected from './components/NoProjectSelected';
import ProjectsSidebar from './components/ProjectsSidebar';

const App = () => {
  const selecedArticle = useRef();
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [pickedArticles, setPickedArticles] = useState([]);
  const [authorName, setAuthorName] = useState('');
  const [articles, setArticles] = useState([]);
  const [error, setError] = useState(null);
  const [availablePlaces, setAvailablePlaces] = useState([]);
  const [projectState, setProjectState] = useState({
    selectedProjectId: undefined,
    projects: []
  });

  function handleCancelAddProject() {
    setProjectState(prevState => ({
      ...prevState,
      selectedProjectId: undefined,
    }));
  }

  function handleAddArticle(articleData) {
    setPickedArticles(prevPickedArticles => [
      ...prevPickedArticles,
      { title: articleData.title, content: articleData.content } // Adding content here
    ]);
  }
  
  function handleStartAddProject() {
    setProjectState(prevState => ({
      ...prevState,
      selectedProjectId: null,
    }));
  }

  function handleAddProject(projectData) {
    setProjectState(prevState => {
      const projectId = Math.random();
      const newProject = {
        ...projectData,
        id: projectId
      };
      return {
        ...prevState,
        selectedProjectId: undefined,
        projects: [...prevState.projects, newProject]
      };
    });
  }

  function handleStartRemoveArticle(id) {
    setModalIsOpen(true);
    selecedArticle.current = id;
  }

  function handleStopRemoveArticle() {
    setModalIsOpen(false);
  }

  function handleSelectArticle(id) {
    setPickedArticles((prevPickedArticles) => {
      if (prevPickedArticles.some((article) => article.id === id)) {
        return prevPickedArticles;
      }
      const article = availablePlaces.find((place) => place.id === id);
      return [article, ...prevPickedArticles];
    });
  }

  function handleRemovePlace() {
    setPickedArticles((prevPickedArticles) => {
      return prevPickedArticles.filter(article => article.id !== selecedArticle.current);
    });
    setModalIsOpen(false);
  }

  function handleSelectProject(id) {
    setProjectState(prevState => ({
      ...prevState,
      selectedProjectId: id,
    }));
  }

  const handleSearch = async () => {
    const API_KEY = import.meta.env.VITE_API_KEY;
    const url = `https://api.elsevier.com/content/search/scopus?query=AUTHOR-NAME(${authorName})`;

    try {
      const response = await axios.get(url, {
        headers: {
          'X-ELS-APIKey': API_KEY,
          'Accept': 'application/json'
        }
      });
      const fetchedArticles = response.data['search-results'].entry.map(article => ({
        id: article['dc:identifier'],
        title: article['dc:title'],
        publication: article['prism:publicationName'],
        date: article['prism:coverDate'],
        abstract: article['dc:description']
      }));
      setArticles(fetchedArticles);
      setAvailablePlaces(fetchedArticles);
      setError(null);
    } catch (err) {
      setError("Veri çekilirken bir hata oluştu");
      setArticles([]);
      setAvailablePlaces([]);
    }
  };

  let content;
  if (projectState.selectedProjectId === null) {
    content = <NewProject onAdd={(projectData) => {
      handleAddProject(projectData);
      handleAddArticle(projectData); // Yeni eklenen makale "I would like to read" listesine de ekleniyor
    }} onCancel={handleCancelAddProject} />;
  } else if (projectState.selectedProjectId === undefined) {
    content = <NoProjectSelected onStartAddProject={handleStartAddProject} />;
  }

  return (
    <>
      <Modal open={modalIsOpen} onClose={handleStopRemoveArticle}>
        {modalIsOpen && (<DeleteConfirmation onCancel={handleStopRemoveArticle} onConfirm={handleRemovePlace} />)}
      </Modal>
      <header >
        <img className='main-img' src={articleImg} alt="Article" />
        <h1>Article Pickle</h1>
        <p>Create your personal collection for articles you want to read later.</p>
      </header>
      <main className="flex">
        <ProjectsSidebar
          onStartAddProject={handleStartAddProject}
          projects={projectState.projects}
          onSelectProject={handleSelectProject}
          selectedProjectId={projectState.selectedProjectId}
        />
        <div className="flex-grow p-8">
          {content}
          <Articles
            title="I would like to read..."
            fallbackText="Select the articles you would like to read below."
            articles={pickedArticles}
            onSelectArticle={handleStartRemoveArticle}
          />
          <Articles
            title="All articles"
            fallbackText="Sorting articles by length"
            articles={availablePlaces}
            onSelectArticle={handleSelectArticle}
          />
        </div>
      </main>
      <div id='scopus' className="p-8 w-1/3 text-end">
        <h1>Article Search</h1>
        <input
          type="text"
          placeholder="Enter author name"
          value={authorName}
          onChange={(e) => setAuthorName(e.target.value)}
          className="p-2 border rounded"
        />
        <button onClick={handleSearch}>Search</button>
        {error && <p>{error}</p>}
      </div>
    </>
  );
};

export default App;
