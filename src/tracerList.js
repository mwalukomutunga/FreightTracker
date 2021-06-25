import LocalShippingIcon from '@material-ui/icons/LocalShipping';
const Trackers = ({Driver}) => {
    return (
        <div id="divmap">
            <div id="map" >
                <div style={{ margin: 50 }} className="leaflet-top leaflet-left">
                    <div id="marker-legend">
                        <div className="card" style={{ width: '12rem' }} >
                            <div className="card-body">
                                <div className="row">
                                    <div className="col">
                                        <p className="card-title float-left">Tracers</p>
                                    </div>
                                    <div className="col">
                                    <a href="#" className=" card-title float-right">show all</a>
                                    </div>                                    
                                </div>
                                <li style={{color:"dodgerblue"}} className="list-group-item chatbotListOptionsBox"><LocalShippingIcon/>   {Driver.vehicleInfo}</li>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Trackers;