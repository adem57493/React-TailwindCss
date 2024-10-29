export default function ProjectsSidebar({ onStartAddProject, projects, onSelectProject, selectedProjectId }) {
    return (
      <aside className=" border-2 border-[#0d373e] w-1/3 h-screen  px-8 py-16  text-stone-50 md:w-72 rounded-xl">
        <h2 className="mb-8 font-bold uppercase md:text-xl text-stone-200">Your Articles</h2>
        <div>
          <button className="px-4 py-2 text-xs md:text-base rounded-md bg-stone-700 text-stone-400 hover:bg-stone-600 hover:text-stone-100" onClick={onStartAddProject}>
            + Add Article
          </button>
        </div>
        <ul className="mt-8">
          {projects.map((project) => {
            let cssClasses = "w-full text-left px-2 py-1 rounded-sm my-1 hover:text-stone-200 hover:bg-stone-800";
            if (project.id === selectedProjectId) {
              cssClasses += ' bg-stone-800 text-stone-200';
            } else {
              cssClasses += ' text-stone-400';
            }
            return (
              <li key={project.id}>
                <button className={cssClasses} onClick={() => onSelectProject(project.id)}>
                  {project.title}
                </button>
              </li>
            );
          })}
        </ul>
      </aside>
    );
  }
  