import FormDAO from "../DAO/FormDAO.js";

export default class FormController {
  static async apipostform(req, res) {
    try {
      const {
        firstname,
        lastname,
        adresse,
        city,
        CodePostal,
        phoneNumber,
        cartitems,
      } = req.body;

      const newFormData = await FormDAO.addForm(
        firstname,
        lastname,
        adresse,
        city,
        CodePostal,
        phoneNumber,
        cartitems
      );
      res.status(201).json({ message: "Form data saved successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  }
  static async getClientCommands(req, res) {
    try {
      const clientCommands = await FormDAO.getClientCommands();
      res.json({ clientCommands });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  }
  static async deleteClientCommands(req, res) {
    const { id } = req.params;
    console.log(`Deleting client command with id ${id}`);
    try {
      const deletedClientCommands = await FormDAO.deleteClientCommands(id);
      if (deletedClientCommands.error) {
        console.log(
          `Error deleting client command with id ${id}: ${deletedClientCommands.error}`
        );
        res.status(500).send({ error: deletedClientCommands.error });
      } else {
        console.log(`Client command with id ${id} deleted successfully`);
        res.send({ message: "Client commands deleted successfully" });
      }
    } catch (e) {
      console.error(`Unable to delete client command with id ${id}: ${e}`);
      res.status(500).send({ error: e });
    }
  }
}
