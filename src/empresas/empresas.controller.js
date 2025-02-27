import Empresa from  "./empresas.model.js"

export const registroEmpresas = async (req, res) => {
    const { name, impactLevel,address, yearsOfExperience, category, email, phone } = req.body;
    try {
      const empresas = new Empresa({ name,address, impactLevel, yearsOfExperience, category, email, phone });
      await empresas.save();
      res.status(201).json(empresas);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };
  
