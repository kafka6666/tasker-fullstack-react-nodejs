import { asyncHandler } from "../utils/async-handler.ts";

const getProjectById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  //validation
  projectValidation(body);
});

const createProject = asyncHandler(async (req, res) => {
    const { id } = req.params;
  
    //validation
    projectValidation(body);
  });

  const updateProject = asyncHandler(async (req, res) => {
    const { id } = req.params;
  
    //validation
    projectValidation(body);
  });

  const deleteProject = asyncHandler(async (req, res) => {
    const { id } = req.params;
  
    //validation
    projectValidation(body);
  });

  const addMemberToProject = asyncHandler(async (req, res) => {
    const { id } = req.params;
  
    //validation
    projectValidation(body);
  });

  const getProjectMembers = asyncHandler(async (req, res) => {
    const { id } = req.params;
  
    //validation
    projectValidation(body);
  });

  const updateProjectMembers = asyncHandler(async (req, res) => {
    const { id } = req.params;
  
    //validation
    projectValidation(body);
  });

  const updateMemberRole = asyncHandler(async (req, res) => {
    const { id } = req.params;
  
    //validation
    projectValidation(body);
  });

  const deleteProjectMember = asyncHandler(async (req, res) => {
    const { id } = req.params;
  
    //validation
    projectValidation(body);
  });

export { 
    getProjectById, 
    createProject,
    updateProject,
    deleteProject,
    addMemberToProject,
    getProjectMembers,
    updateProjectMembers,
    updateMemberRole,
    deleteProjectMember
};