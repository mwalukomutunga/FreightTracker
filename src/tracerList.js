const Trackers = ({Driver}) => {
    return (
        <div id="divmap">
            <div id="map" >
                <div style={{ margin: 50 }} className="leaflet-top leaflet-left">
                    <div id="marker-legend">
                        <div className="card" style={{ width: '12rem' }} >
                            <div className="card-body">
                                <div className="row">
                                    <div class="col">
                                        <p className="card-title float-left">Tracers</p>
                                    </div>
                                    <div class="col">
                                    <a href="#" className=" card-title float-right">show all</a>
                                    </div>                                    
                                </div>
                                <li className="list-group-item">{Driver.vehicleInfo}</li>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Trackers;