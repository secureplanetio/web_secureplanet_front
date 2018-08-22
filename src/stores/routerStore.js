import { observable, action } from 'mobx';

class routerStore {

  @observable router = [];


  @action setRouter(router) {

    this.router = [];
    const r = [];
    let path = '';
    // recorro para simplificarle a mobx
    router.forEach((child) => {
      if (child.title) {
        if (child.path.charAt(0) !== '/') {
          // concateno el path actual con el anterior para armar la ruta rlativa al dominio
          path += `/${child.path}`;
        } else {
          // si ya viene relativa al dominio la pego completa
          path = child.path;
        }

        r.push({ title: child.title, path });
      }
    });
    this.router = r;

  }

  @action addRouter(title, path) {
    this.router.push({ title, path });
  }


}


export default routerStore;
