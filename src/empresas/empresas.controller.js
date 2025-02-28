import Empresa from  "./empresas.model.js"


export const registroEmpresas = async (req, res) => {
    try {
        const data = req.body

         data.yearsOfExperience = ((new Date().getFullYear()) - data.createdDateCreation)

         const empresa = await Empresa.create(data)

      res.status(201).json({
        empresa
      });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };

  export const getEmpresas = async (req, res) => {
    const { sortBy = 'name', order = 'asc', category, minYearsOfExperience } = req.query;
    const sortOptions = { [sortBy]: order === 'asc' ? 1 : -1 };
    const filterOptions = {};
  
    if (category) filterOptions.category = category;
    if (minYearsOfExperience) {
      const minDate = new Date(new Date().setFullYear(new Date().getFullYear() - parseInt(minYearsOfExperience, 10)));
      filterOptions.createdAt = { $lte: minDate };
    }
  
    try {
      let empresas = await Empresa.find(filterOptions).sort(sortOptions);
      empresas = empresas.map(empresa => ({
        ...empresa.toObject(),
        yearsOfExperience: calculateYearsOfExperience(empresa.createdAt),
      }));
      res.json(empresas);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };