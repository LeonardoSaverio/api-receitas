import Receita from "../models/Receita";

export default {
  render(receita: Receita) {
    return {
      id: receita.id,
      name: receita.name,
      difficult: receita.difficult,
      preparation: receita.preparation,
      photos: receita.photos.map(photo => `${process.env.IMAGE_ADDRESS}/images/${photo}`),
      ingredientes: receita.ingredientes,
      user: receita.user
    }
  },

  renderMany(receitas: Receita[]) {
    return receitas.map(receita => this.render(receita));
  }
}