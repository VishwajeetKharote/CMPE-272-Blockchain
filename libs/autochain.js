'use strict';

const BusinessNetworkConnection = require('composer-client').BusinessNetworkConnection;


// these are the credentials to use to connect to the Hyperledger Fabric
let cardname = 'admin@autochain';
const namespace = 'org.example.biznet';

/** Class for the land registry*/
class AutoChain {

   /** 
    * @description Initalizes the LandRegsitry by making a connection to the Composer runtime
    * @return {Promise} A promise whose fullfillment means the initialization has completed
    */
    async getVehicles() {
    	
        let bizNetworkConnection = new BusinessNetworkConnection();
        let businessNetworkDefinition = await bizNetworkConnection.connect(cardname);

        let registry = await bizNetworkConnection.getAssetRegistry('org.example.biznet.Vehicle');
        
        let vehicles = await registry.getAll();

       
        return vehicles;
    }

    async createVehicleEntry(details) {

    	const METHOD = 'createVehicleEntry';
        const uuidv1 = require('uuid/v1');

        try {
            
            let bizNetworkConnection = new BusinessNetworkConnection();
            let businessNetworkDefinition = await bizNetworkConnection.connect(cardname);

            let factory = businessNetworkDefinition.getFactory();

            const vehicle = factory.newResource(namespace, 'Vehicle','vin:'+uuidv1());
            
            Object.keys(details).map(k => { vehicle[k] = details[k];  });

            // save the order
            const assetRegistry = await bizNetworkConnection.getAssetRegistry(vehicle.getFullyQualifiedType());
            await assetRegistry.add(vehicle);

            return true;
            
        } catch(error) {
          
            console.log(METHOD, 'uh-oh', error);
        }

    }


    async getVehicle(vin) {

        const METHOD = 'getVehicle';
        const uuidv1 = require('uuid/v1');

        try {
            
            let bizNetworkConnection = new BusinessNetworkConnection();
            let businessNetworkDefinition = await bizNetworkConnection.connect(cardname);

            let registry = await bizNetworkConnection.getAssetRegistry('org.example.biznet.Vehicle');
            const vehicle = await registry.get(vin);

            return vehicle;
            
        } catch(error) {
          
            console.log(METHOD, 'uh-oh', error);
        }

    }


    async updateVehicle(vin,details) {

        const METHOD = 'updateVehicle';
        const uuidv1 = require('uuid/v1');

        try {
            
            let bizNetworkConnection = new BusinessNetworkConnection();
            let businessNetworkDefinition = await bizNetworkConnection.connect(cardname);

            let registry = await bizNetworkConnection.getAssetRegistry('org.example.biznet.Vehicle');
            const vehicle = await registry.get(vin);

            Object.keys(details).map(k => { vehicle[k] = details[k];  });

            await registry.update(vehicle);

            return true;
            
        } catch(error) {
          
            console.log(METHOD, 'uh-oh', error);
        }

    }


  
}
module.exports = AutoChain;