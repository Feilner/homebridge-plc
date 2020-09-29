/*
 * (c) 2020 Feilner
 */
 
 
var PlatformAccessory, Service, Characteristic, UUIDGen;
var snap7 = require('node-snap7');


//Exports
module.exports = function(homebridge) {
  // Service and Characteristic from hap-nodejs/lib/gen/HomeKitTypes.js
  var platformName = 'homebridge-s7-plc';
  Service = homebridge.hap.Service;
  Characteristic = homebridge.hap.Characteristic;
  UUIDGen = homebridge.hap.uuid;
  PlatformAccessory = homebridge.platformAccessory;
  homebridge.registerPlatform(platformName, 'S7', S7Platform);

  /* currently not funtional
  homebridge.registerAccessory(platformName, 'S7_LightDimm', GenericS7, true);
  homebridge.registerAccessory(platformName, 'S7_LightBulb', GenericS7, true);
  homebridge.registerAccessory(platformName, 'S7_Outlet', GenericS7, true);  
  homebridge.registerAccessory(platformName, 'S7_HumiditySensor', GenericS7, true);
  homebridge.registerAccessory(platformName, 'S7_TemperatureSensor', GenericS7, true);  
  homebridge.registerAccessory(platformName, 'S7_Thermostat', GenericS7, true);  
  homebridge.registerAccessory(platformName, 'S7_WindowCovering', GenericS7, true);    
  homebridge.registerAccessory(platformName, 'S7_Window', GenericS7, true);    
  homebridge.registerAccessory(platformName, 'S7_OccupancySensor', GenericS7, true);      
  homebridge.registerAccessory(platformName, 'S7_MotionSensor', GenericS7, true);      
  homebridge.registerAccessory(platformName, 'S7_Faucet', GenericS7, true);        
  */
}



function S7Platform(log, config) {
    //initialize
    this.log = log;
    this.config = config;
    this.S7Client = new snap7.S7Client();
    this.isConnectOngoing = false;
    this.S7ClientConnect();
}

S7Platform.prototype = {    
    //Accessories retrieval
    accessories: function(callback) {
        var log = this.log;
        var s7PlatformAccessories = [];
        log("Add S7 accessories...");
        //create accessory for each configuration
        this.config.accessories.forEach((config, index) => {
            log("[" + index+1 + "/" + this.config.accessories.length + "] " + config.name + " (" +  config.accessory + ")" );
            //call accessory construction
            var accessory = new GenericS7(this, config);
            s7PlatformAccessories.push(accessory);
        });

        callback(s7PlatformAccessories);
    },
    
    //PLC connection check function
    S7ClientConnect: function() {
        var log = this.log;
        var S7Client = this.S7Client;
        var ip = this.config.ip;
        var rack = this.config.rack;
        var slot = this.config.slot;
        var isConnectOngoing = this.isConnectOngoing;
        
        if (!S7Client.Connected()) {
            log("Connecting to %s (%s:%s)", ip, rack, slot);

            if (!this.isConnectOngoing == true) {
              this.isConnectOngoing = true;
                //PLC connection asynchonousely...
                S7Client.ConnectTo(ip, rack, slot, function(err) {
                  if(err) {
                    log.Error('Connection failed. Code #' + err + ' - ' + S7Client.ErrorText(err));
                  }
                  else {
                    log("Connected to %s (%s:%s)", ip, rack, slot);
                  }
                  this.isConnectOngoing = false;
                });
            }
        }
    }
}






function GenericS7(platform, config) {
  this.platform = platform;
  this.log = platform.log;
  this.name = config.name;
  this.buf = Buffer.alloc(4);
  var uuid = UUIDGen.generate(config.name + config.accessory);
  this.accessory = new PlatformAccessory(this.name, uuid); 

  ////////////////////////////////////////////////////////////////
  // Lightbulb
  ////////////////////////////////////////////////////////////////
  if (config.accessory == 'S7_LightBulb') {   
    this.service =  new Service.Lightbulb(this.name);
    this.accessory.addService(this.service);

    this.service.getCharacteristic(Characteristic.On)
      .on('get', function(callback) {this.getBit(callback, 
        config.db, 
        Math.floor(config.get_State), Math.floor((config.get_State*10)%10)
      )}.bind(this))
      .on('set', function(powerOn, callback) { this.setOnOffBit(powerOn, callback, 
        config.db, 
        Math.floor(config.set_On), Math.floor((config.set_On*10)%10),
        Math.floor(config.set_Off), Math.floor((config.set_Off*10)%10),
      )}.bind(this));
  }

  ////////////////////////////////////////////////////////////////
  // S7_LightBulbDim
  ////////////////////////////////////////////////////////////////
  else if (config.accessory == 'S7_LightBulbDim') {   
    this.service =  new Service.Lightbulb(this.name);
    this.accessory.addService(this.service);

    this.service.getCharacteristic(Characteristic.On)
      .on('get', function(callback) {this.getBit(callback, 
        config.db, 
        Math.floor(config.get_State), Math.floor((config.get_State*10)%10)
      )}.bind(this))
      .on('set', function(powerOn, callback) { this.setOnOffBit(powerOn, callback, 
        config.db, 
        Math.floor(config.set_On), Math.floor((config.set_On*10)%10),
        Math.floor(config.set_Off), Math.floor((config.set_Off*10)%10),
      )}.bind(this));

    this.service.getCharacteristic(Characteristic.Brightness)
    .on('get', function(callback) {this.getReal(callback, 
      config.db, 
      config.get_Brightness
      )}.bind(this))
    .on('set', function(value, callback) {this.setReal(value, callback, 
      config.db, 
      config.set_Brightness
      )}.bind(this))
      .setProps({
        minValue: 20,
        maxValue: 100,
        minStep: 1
    });            
  }

  ////////////////////////////////////////////////////////////////
  // Outlet
  ////////////////////////////////////////////////////////////////    
  else if (config.accessory == 'S7_Outlet') {   
    this.service =  new Service.Outlet(this.name);
    this.accessory.addService(this.service);

    this.service.getCharacteristic(Characteristic.On)
      .on('get', function(callback) {this.getBit(callback, 
        config.db, 
        Math.floor(config.get_State), Math.floor((config.get_State*10)%10)
      )}.bind(this))
      .on('set', function(powerOn, callback) { this.setOnOffBit(powerOn, callback, 
        config.db, 
        Math.floor(config.set_On), Math.floor((config.set_On*10)%10),
        Math.floor(config.set_Off), Math.floor((config.set_Off*10)%10),
      )}.bind(this));
  }

  ////////////////////////////////////////////////////////////////
  // TemperatureSensor
  //////////////////////////////////////////////////////////////// 
  else if (config.accessory == 'S7_TemperatureSensor') {   
    this.service =  new Service.TemperatureSensor(this.name);
    this.accessory.addService(this.service);

    this.service.getCharacteristic(Characteristic.CurrentTemperature)
    .on('get', function(callback) {this.getReal(callback, 
      config.db, 
      config.get_CurrentTemperature
      )}.bind(this))
    .setProps({
      minValue: -50,
      maxValue: 50,
      minStep: 0.1    
    });
  }

  ////////////////////////////////////////////////////////////////
  // HumiditySensor
  //////////////////////////////////////////////////////////////// 
  else if (config.accessory == 'S7_HumiditySensor') {   
    this.service =  new Service.HumiditySensor(this.name);
    this.accessory.addService(this.service);

    this.service.getCharacteristic(Characteristic.CurrentRelativeHumidity)
    .on('get', function(callback) {this.getReal(callback, 
      config.db, 
      config.get_CurrentRelativeHumidity
      )}.bind(this))
    .setProps({
      minValue: 0,
      maxValue: 100,
      minStep: 1    
    });
  }

  ////////////////////////////////////////////////////////////////
  // Thermostat
  ////////////////////////////////////////////////////////////////  
  else if (config.accessory == 'S7_Thermostat'){
    this.service = new Service.Thermostat(this.name);
    this.accessory.addService(this.service);

    if ('get_CurrentHeaterCoolerState' in config) {
      this.service.getCharacteristic(Characteristic.CurrentHeatingCoolingState)
      .on('get', function(callback) {this.getByte(callback,
        config.db, 
        config.get_CurrentHeaterCoolerState
        )}.bind(this));
    }
    else
    {
      this.service.getCharacteristic(Characteristic.CurrentHeatingCoolingState)
      .on('get', function(callback) {this.getDummy(callback,
        1, // currently return fixed value inactive=0, idle=1, heating=2, cooling=3
        'CurrentHeatingCoolingState'
        )}.bind(this));
    }
  this.service.getCharacteristic(Characteristic.TargetHeatingCoolingState)
  .on('get', function(callback) {this.getDummy(callback,
    3, // currently return fixed value off=0, heat=1, cool=2, automatic=3
    'TargetHeatingCoolingState'
    )}.bind(this))
  .on('set', function(value, callback) {this.setDummy(value, callback, 
    'TargetHeatingCoolingState'
    )}.bind(this));  

    this.service.getCharacteristic(Characteristic.TemperatureDisplayUnits)
    .on('get', function(callback) {this.getDummy(callback,
      0, // currently return fixed value celsium=0, fareneinheit=1
      'TemperatureDisplayUnits'
      )}.bind(this))
    .on('set', function(value, callback) {this.setDummy(value, callback, 
      'TemperatureDisplayUnits'
      )}.bind(this));  

      this.service.getCharacteristic(Characteristic.CurrentTemperature)
      .on('get', function(callback) {this.getReal(callback, 
        config.db, 
        config.get_CurrentTemperature
        )}.bind(this));

      this.service.getCharacteristic(Characteristic.TargetTemperature)
      .on('get', function(callback) {this.getReal(callback, 
        config.db, 
        config.get_TargetTemperature
        )}.bind(this))
      .on('set', function(value, callback) {this.setReal(value, callback, 
        config.db, 
        config.set_TargetTemperature
        )}.bind(this))
        .setProps({
          minValue: 20,
          maxValue: 30,
          minStep: 1
      });                 
  }  
  ////////////////////////////////////////////////////////////////
  // WindowCovering
  ////////////////////////////////////////////////////////////////    
  else if (config.accessory == 'S7_WindowCovering'){ 
    this.service = new Service.WindowCovering(this.name);
    this.accessory.addService(this.service);

    // create handlers for required characteristics
    this.service.getCharacteristic(Characteristic.CurrentPosition)
      .on('get', function(callback) {this.getReal(callback, 
        config.db, 
        config.get_CurrentPosition,
        this.adaptWindowCoveringValue
        )}.bind(this));

    this.service.getCharacteristic(Characteristic.TargetPosition)
      .on('get', function(callback) {this.getReal(callback, 
        config.db, 
        config.get_TargetPosition,
        this.adaptWindowCoveringValue
        )}.bind(this))
      .on('set', function(value, callback) {this.setReal(value, callback, 
        config.db, 
        config.set_TargetPosition,
        this.adaptWindowCoveringValue
        )}.bind(this));

    if ('get_PositionState' in config) {
      this.service.getCharacteristic(Characteristic.PositionState)
        .on('get', function(callback) {this.getReal(callback, 
          config.db, 
          config.get_PositionState,
        )}.bind(this));
    }
    else {
        this.service.getCharacteristic(Characteristic.PositionState)
      .on('get', function(callback) {this.getDummy(callback,
        2,
        'PositionState'
        )}.bind(this));
    }
      
    if ('set_HoldPosition' in config) {
    this.service.getCharacteristic(Characteristic.HoldPosition)
      .on('set', function(value, callback) { this.setBit(value, callback, 
        config.db,
        Math.floor(config.set_HoldPosition), Math.floor((config.set_HoldPosition*10)%10),
        )}.bind(this));
    }
    else {
      this.service.getCharacteristic(Characteristic.HoldPosition)
        .on('get', function(callback) {this.handleDummy(callback, 
          'HoldPosition'        
          )}.bind(this));
    }
  }
 ////////////////////////////////////////////////////////////////
  // Window
  ////////////////////////////////////////////////////////////////    
  else if (config.accessory == 'S7_Window'){ 
    this.service = new Service.Window(this.name);
    this.accessory.addService(this.service);

    // create handlers for required characteristics
    this.service.getCharacteristic(Characteristic.CurrentPosition)
      .on('get', function(callback) {this.getReal(callback, 
        config.db, 
        config.get_CurrentPosition,
        this.adaptWindowCoveringValue
        )}.bind(this));

    if ('get_TargetPosition' in config) {        
      this.service.getCharacteristic(Characteristic.TargetPosition)
        .on('get', function(callback) {this.getReal(callback, 
          config.db, 
          config.get_TargetPosition,
          this.adaptWindowCoveringValue
          )}.bind(this))
        .on('set', function(value, callback) {this.setReal(value, callback, 
          config.db, 
          config.set_TargetPosition,
          this.adaptWindowCoveringValue
          )}.bind(this));
      }
      else
      {
        this.service.getCharacteristic(Characteristic.TargetPosition)
          .on('get', function(callback) {this.getDummy(callback, 
            0,
            'TargetPosition'
            )}.bind(this))
          .on('set', function(value, callback) {this.setDummy(value, callback, 
            'TargetPosition'
            )}.bind(this));
      }
    if ('get_PositionState' in config) {
      this.service.getCharacteristic(Characteristic.PositionState)
        .on('get', function(callback) {this.getReal(callback, 
          config.db, 
          config.get_PositionState,
        )}.bind(this));
    }
    else {
        this.service.getCharacteristic(Characteristic.PositionState)
      .on('get', function(callback) {this.getDummy(callback,
        2,
        'PositionState'
        )}.bind(this));
    }
      
    if ('set_HoldPosition' in config) {
    this.service.getCharacteristic(Characteristic.HoldPosition)
      .on('set', function(value, callback) { this.setBit(value, callback, 
        config.db,
        Math.floor(config.set_HoldPosition), Math.floor((config.set_HoldPosition*10)%10),
        )}.bind(this));
    }
    else {
      this.service.getCharacteristic(Characteristic.HoldPosition)
        .on('get', function(callback) {this.handleDummy(callback, 
          'HoldPosition'        
          )}.bind(this));
    }
  }  
  ////////////////////////////////////////////////////////////////
  // OccupancySensor
  ////////////////////////////////////////////////////////////////   
  else if (config.accessory == 'S7_OccupancySensor'){
    this.service = new Service.OccupancySensor(this.name);
    this.accessory.addService(this.service);

    this.service.getCharacteristic(Characteristic.OccupancyDetected)
      .on('get', function(callback) {this.getBit(callback, 
        config.db, 
        Math.floor(config.get_OccupancyDetected), Math.floor((config.get_OccupancyDetected*10)%10)
      )}.bind(this))    
  }
  ////////////////////////////////////////////////////////////////
  // MotionSensor
  ////////////////////////////////////////////////////////////////   
  else if (config.accessory == 'S7_MotionSensor'){
    this.service = new Service.OccupancySensor(this.name);
    this.accessory.addService(this.service);

    this.service.getCharacteristic(Characteristic.MotionDetected)
      .on('get', function(callback) {this.getBit(callback, 
        config.db, 
        Math.floor(config.get_MotionDetected), Math.floor((config.get_MotionDetected*10)%10)
      )}.bind(this))    
  }  
  ////////////////////////////////////////////////////////////////
  // Faucet
  ////////////////////////////////////////////////////////////////   
  else if (config.accessory == 'S7_Faucet'){
    this.service =  new Service.Faucet(this.name);
    this.accessory.addService(this.service);

    this.service.getCharacteristic(Characteristic.Active)
      .on('get', function(callback) {this.getBit(callback, 
        config.db, 
        Math.floor(config.get_State), Math.floor((config.get_State*10)%10)
      )}.bind(this))
      .on('set', function(powerOn, callback) { this.setOnOffBit(powerOn, callback, 
        config.db, 
        Math.floor(config.set_On), Math.floor((config.set_On*10)%10),
        Math.floor(config.set_Off), Math.floor((config.set_Off*10)%10),
      )}.bind(this));
  }
  else {
    this.log("Accessory "+ config.accessory + " is not defined.")
  }
      
  this.accessory.getService(Service.AccessoryInformation)
  .setCharacteristic(Characteristic.Manufacturer, ('manufacturer' in config) ? config.manufacturer : 'S7-PLC')
  .setCharacteristic(Characteristic.Model, config.accessory)
  .setCharacteristic(Characteristic.SerialNumber, uuid)
  .setCharacteristic(Characteristic.FirmwareRevision, '0.0.1'); 

  this.log.debug("Done " + this.name + " (" + config.accessory + ")");

}

GenericS7.prototype = {

  getServices: function() {
    return [this.accessory.getService(Service.AccessoryInformation), this.service];
  },

  adaptWindowCoveringValue: function(value) {
    return 100-value;
  },

  //////////////////////////////////////////////////////////////////////////////
  // DUMMY
  //////////////////////////////////////////////////////////////////////////////
  setDummy: function(value, callback, text) {
    this.log.debug("setDummy("+ this.name +") " + text + ": " + value);
    callback(null);
  },

  handleDummy: function(callback, text) {
    this.log.debug("handleDummy("+ this.name +") " + text);
    callback(null);
  },

  getDummy: function(callback, value, text) {
    this.log.debug("getDummy("+ this.name +") " + text + ": " + value);
    callback(null, value);
  },


  //////////////////////////////////////////////////////////////////////////////
  // BIT
  //////////////////////////////////////////////////////////////////////////////
  setOnOffBit: function(value, callback, db, on_offset, on_bit, off_offset, off_bit) {    
    //Set single bit depending on value
    var S7Client = this.platform.S7Client;
    var buf = this.buf;
    var log = this.log;
    var name = this.name;
    //check PLC connection
    this.platform.S7ClientConnect();
    if (S7Client.Connected()) {
      const offset = value ? on_offset : off_offset;
      const bit = value ? on_bit : off_bit;
      this.buf[0] = 1;
      // Write single Bit to DB asynchonousely...
      S7Client.WriteArea(S7Client.S7AreaDB, db, ((offset*8) + bit), 1, S7Client.S7WLBit, this.buf, function(err) {
        if(err) {
          log("setOnOffBit("+ name +") >> WriteArea failed DB" + db + "DBX"+ offset + "." + bit +" Code #" + err + " - " + S7Client.ErrorText(err));
          S7Client.Disconnect();
          callback(err);
        }
        else {
          log.debug("setOnOffBit("+ name +") DB" + db + "DBX"+ offset + "." + bit + ": " + value);
          callback(null);
        }
      });
    }
    else {
      callback(new Error('PLC not connected'), false);
    }
  },

  setBit: function(value, callback, db, offset, bit, ) {    
    //Set single bit depending on value
    var S7Client = this.platform.S7Client;
    var buf = this.buf;
    var log = this.log;
    var name = this.name;
    //check PLC connection
    this.platform.S7ClientConnect();
    if (S7Client.Connected()) {
      this.buf[0] = value ? 1 : 0;
      // Write single Bit to DB asynchonousely...
      S7Client.WriteArea(S7Client.S7AreaDB, db, ((offset*8) + bit), 1, S7Client.S7WLBit, this.buf, function(err) {
        if(err) {
          log("setOnOffBit("+ name +") >> WriteArea failed DB" + db + "DBX"+ offset + "." + bit +" Code #" + err + " - " + S7Client.ErrorText(err));
          S7Client.Disconnect();
          callback(err);
        }
        else {
          log.debug("setOnOffBit("+ name +") DB" + db + "DBX"+ offset + "." + bit + ": " + value);
          callback(null);
        }
      });
    }
    else {
      callback(new Error('PLC not connected'), false);
    }
  },


  getBit: function(callback, db, offset, bit) {
    //read single bit
    var S7Client = this.platform.S7Client;
    var log = this.log;
    var name = this.name;
    //check PLC connection
    this.platform.S7ClientConnect();
      
    if (S7Client.Connected()) {
      // Read one bit from PLC DB asynchonousely...
      S7Client.ReadArea(S7Client.S7AreaDB, db, ((offset*8) + bit), 1, S7Client.S7WLBit, function(err, res) {
        if(err) {
          log("getBit("+ name +") >> ReadArea failed DB" + db + "DBX"+ offset + "." + bit +" Code #" + err + " - " + S7Client.ErrorText(err));
          S7Client.Disconnect();
          callback(err, 0);
        }
        else {
          const value = ((res[0]) ? 1 : 0);
          log.debug("getBit("+ name +") DB" + db + "DBX"+ offset + "." + bit + ": " + value);
          callback(null, value);
        }
      }); 
    }
    else {
      callback(new Error('PLC not connected'), false);
    }
  },
  
  //////////////////////////////////////////////////////////////////////////////
  // REAL
  //////////////////////////////////////////////////////////////////////////////
  setReal: function(value, callback, db, offset, valueMod) {
    var S7Client = this.platform.S7Client;
    var log = this.log;
    var name = this.name;
    var buf = this.buf
    //check PLC connection
    this.platform.S7ClientConnect();
    if (typeof(valueMod) != "undefined")
    {
      value = valueMod(value);
    }
    if (S7Client.Connected()) {
        buf.writeFloatBE(value, 0);
        // Write one real from DB asynchonousely...
        S7Client.WriteArea(S7Client.S7AreaDB, db, offset, 1, S7Client.S7WLReal, buf, function(err) {
          if(err) {
            log("setReal: >> WriteArea failed." + name +") DB" + db + "DBD"+ offset +" Code #" + err + " - " + S7Client.ErrorText(err));
            S7Client.Disconnect();
            callback(err);
          }
          else {              
            log.debug("setReal("+ name +") DB" + db + "DBD"+ offset + ": " + value);
            callback(null);
          }
        });
    }
    else {
        callback(new Error('PLC not connected'));
    }
  },
    
  getReal: function(callback, db, offset, valueMod) {
    var S7Client = this.platform.S7Client;
    var log = this.log;
    var name = this.name;
    var value = 0;
    //check PLC connection
    this.platform.S7ClientConnect();
    
    if (S7Client.Connected()) {
        // Write one real from DB asynchonousely...
        
        S7Client.ReadArea(S7Client.S7AreaDB, db, offset, 1, S7Client.S7WLReal, function(err, res) {
          if(err) {
            log("getReal("+ name +") >> ReadArea failed DB" + db + "DBD"+ offset +" Code #" + err + " - " + S7Client.ErrorText(err));
            S7Client.Disconnect();
            callback(err);
          }
          else {              
            value = res.readFloatBE(0);
            if (typeof(valueMod) != "undefined")
            {
              value = valueMod(value);
            }            
            log.debug("getReal("+ name +") DB" + db + "DBD"+ offset + ": " + value);
            callback(null, value);
          }
        });
    }
    else {
        callback(new Error('PLC not connected'));
    }
  },


  //////////////////////////////////////////////////////////////////////////////
  // BYTE
  //////////////////////////////////////////////////////////////////////////////
  setByte: function(value, callback, db, offset, valueMod) {
    var S7Client = this.platform.S7Client;
    var log = this.log;
    var name = this.name;
    var buf = this.buf
    //check PLC connection
    this.platform.S7ClientConnect();
    if (typeof(valueMod) != "undefined")
    {
      value = valueMod(value);
    }
    if (S7Client.Connected()) {
        buf[0] = value;
        // Write one real from DB asynchonousely...
        S7Client.WriteArea(S7Client.S7AreaDB, db, offset, 1, S7Client.S7WLByte, buf, function(err) {
          if(err) {
            log("setReal: >> WriteArea failed." + name +") DB" + db + "DBB"+ offset +" Code #" + err + " - " + S7Client.ErrorText(err));
            S7Client.Disconnect();
            callback(err);
          }
          else {              
            log.debug("setReal("+ name +") DB" + db + "DBB"+ offset + ": " + value);
            callback(null);
          }
        });
    }
    else {
        callback(new Error('PLC not connected'));
    }
  },
    
  getByte: function(callback, db, offset, valueMod) {
    var S7Client = this.platform.S7Client;
    var log = this.log;
    var name = this.name;
    var value = 0;
    //check PLC connection
    this.platform.S7ClientConnect();
    
    if (S7Client.Connected()) {
        // Write one real from DB asynchonousely...
        
        S7Client.ReadArea(S7Client.S7AreaDB, db, offset, 1, S7Client.S7WLByte, function(err, res) {
          if(err) {
            log("getReal("+ name +") >> ReadArea failed DB" + db + "DBB"+ offset +" Code #" + err + " - " + S7Client.ErrorText(err));
            S7Client.Disconnect();
            callback(err);
          }
          else {              
            value = res[0];
            if (typeof(valueMod) != "undefined")
            {
              value = valueMod(value);
            }            
            log.debug("getReal("+ name +") DB" + db + "DBB"+ offset + ": " + value);
            callback(null, value);
          }
        });
    }
    else {
        callback(new Error('PLC not connected'));
    }
  },



  //////////////////////////////////////////////////////////////////////////////
  // INT
  //////////////////////////////////////////////////////////////////////////////
  setInt: function(value, callback, db, offset, valueMod) {
    var S7Client = this.platform.S7Client;
    var log = this.log;
    var name = this.name;
    var buf = this.buf
    //check PLC connection
    this.platform.S7ClientConnect();
    if (typeof(valueMod) != "undefined")
    {
      value = valueMod(value);
    }
    if (S7Client.Connected()) {
        buf.writeInt16BE(value, 0);
        // Write one real from DB asynchonousely...
        S7Client.WriteArea(S7Client.S7AreaDB, db, offset, 1, S7Client.S7WLWord, buf, function(err) {
          if(err) {
            log("setReal: >> WriteArea failed." + name +") DB" + db + "DBW"+ offset +" Code #" + err + " - " + S7Client.ErrorText(err));
            S7Client.Disconnect();
            callback(err);
          }
          else {              
            log.debug("setReal("+ name +") DB" + db + "DBW"+ offset + ": " + value);
            callback(null);
          }
        });
    }
    else {
        callback(new Error('PLC not connected'));
    }
  },
    
  getInt: function(callback, db, offset, valueMod) {
    var S7Client = this.platform.S7Client;
    var log = this.log;
    var name = this.name;
    var value = 0;
    //check PLC connection
    this.platform.S7ClientConnect();
    
    if (S7Client.Connected()) {
        // Write one real from DB asynchonousely...
        
        S7Client.ReadArea(S7Client.S7AreaDB, db, offset, 1, S7Client.S7WLWord, function(err, res) {
          if(err) {
            log("getReal("+ name +") >> ReadArea failed DB" + db + "DBW"+ offset +" Code #" + err + " - " + S7Client.ErrorText(err));
            S7Client.Disconnect();
            callback(err);
          }
          else {              
            value = res.readInt16BE(0);
            if (typeof(valueMod) != "undefined")
            {
              value = valueMod(value);
            }            
            log.debug("getReal("+ name +") DB" + db + "DBW"+ offset + ": " + value);
            callback(null, value);
          }
        });
    }
    else {
        callback(new Error('PLC not connected'));
    }
  }


  
}

