
import { Logging } from 'homebridge';
import snap7 from 'node-snap7';




export class PLC {
  private s7: snap7.S7Client;
  private connType: snap7.ConnectionType;
  private slot: number;
  private rack: number;
  private ip: string;
  private isConnectOngoing: boolean;
  private log: Logging;

  constructor(log: Logging, ip: string, rack: number, slot: number, isOP: boolean) { 
    this.s7 = new snap7.S7Client();
    this.log = log;
    this.ip = ip;
    this.rack = rack;
    this.slot = slot;
    this.connType = isOP ? 0x1 : 0x2;
    this.isConnectOngoing = false;    
  }

  //PLC connection check function
  connect() {
    const typeName = ['invalid', 'PG-Communication', 'OP-Communication'];

    let rv = false;


    if (this.s7.Connected()) {
      rv = true;
    } else {
      this.log.info('Connecting to %s (%s:%s) %s', this.ip, this.rack, this.slot, typeName[this.connType]);

      if (!this.isConnectOngoing) {
        this.isConnectOngoing = true;
        this.s7.SetConnectionType(this.connType);
        const ok: boolean = this.s7.ConnectTo(this.ip, this.rack, this.slot);
        this.isConnectOngoing = false;
        if(ok) {
          this.log.info('Connected to %s (%s:%s) %s', this.ip, this.rack, this.slot, typeName[this.connType]);
          rv = true;
        } else {
          this.log.error('Connection to %s (%s:%s) %s failed', this.ip, this.rack, this.slot, typeName[this.connType]);
        }        
      }
    }
    return rv;
  }

  setOnOffBit(value: boolean, db : number, on_offset : number, on_bit : number, off_offset: number, off_bit : number, characteristic : string) {
    //Set single bit depending on value
    const offset = value ? on_offset : off_offset;
    const bit = value ? on_bit : off_bit;
    const logprefix = '[' + 'this.name' + '] ' + characteristic + ': %s (setOnOffBit DB' + db + 'DBX'+ offset + '.' + bit + ')';
    const log = this.log;
    const buf = Buffer.alloc(1);

    //ensure PLC connection
    if (this.connect()) {
      buf.writeUInt8(1);
      if (!this.s7.WriteArea(/*snap7.Area.S7AreaDB*/ 0x84, db, ((offset*8) + bit), 1, /*snap7.WordLen.S7WLBit*/ 0x01 , buf)) {
        const err = this.s7.LastError();
        log.error(logprefix, 'WriteArea failed #' + err.toString(16) + ' - ' + this.s7.ErrorText(err));
        if(err & 0xFFFFF) {
          this.s7.Disconnect();
        }
        log.error('PLC error');
      } else {
        log.debug(logprefix + ' %d ms', String(value), this.s7.ExecTime());
      }
    } else {
      log.error('PLC not connected');
    }
  }



} 


