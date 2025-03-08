import Presenter from './presenter/presenter';
import PointsModel from './model/model';


const pointsModel = new PointsModel();
const presenter = new Presenter({pointsModel});

presenter.init();
