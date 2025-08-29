  #include <Wire.h>
  #include <LiquidCrystal_I2C.h>
  #include <WiFi.h>
  #include <WiFiClientSecure.h>

  #include <PubSubClient.h>
  #include <ESP32Servo.h>


  #define IR 34
  #define LDR 35
  #define led 2
  Servo myservo;
  LiquidCrystal_I2C lcd(0x27, 16, 2);

  const char* ssid = "SeifYousry";
  const char* password = "SY100200#yousry";

  // MQTT إعدادات
  const char* mqtt_user = "Saif__";
  const char* mqtt_pass = "SYrmen77";
  const char* mqtt_server = "43e31bb1eb054ef3a8b8a0286ded2a4e.s1.eu.hivemq.cloud"; 
  const int mqtt_port = 8883;

  const char* mqtt_topic_cmd = "servo/cmd";   
  const char* mqtt_topic_status = "servo/status"; 

  WiFiClientSecure espClient;
  PubSubClient client(espClient);

  int irValue = 0;
  int ldrValue=0;
  void OpenMode();
  void CloseMode();
  String laststatus="";
  void reconnect() {
    while (!client.connected()) {
      Serial.print("Attempting MQTT connection...");
      if (client.connect("Saif_ESP32", mqtt_user, mqtt_pass)) {
        Serial.println("connected");
        client.subscribe(mqtt_topic_cmd); 
      } else {
        Serial.print("failed, rc=");
        Serial.print(client.state());
        Serial.print("\n");
        delay(5000);
      }
    }
  }

  void callback(char* topic, byte* message, unsigned int length) {
    String msg = "";
    for (int i = 0; i < length; i++) {
      msg += (char)message[i];
    }

    Serial.print("Message arrived [");
    Serial.print(topic);
    Serial.print("] ");
    Serial.println(msg);
    msg.trim();
    
    if (msg.equals("open")) {
      OpenMode();
      client.publish(mqtt_topic_status, "open");
      laststatus="open";
    }
  }
  
  void setup() {
    Serial.begin(9600);
    pinMode(IR, INPUT);
    pinMode(led,OUTPUT);
    pinMode(LDR,INPUT);
    lcd.init();
    lcd.backlight();

    myservo.attach(13);

    WiFi.begin(ssid, password);
    while (WiFi.status() != WL_CONNECTED) {
      delay(500);
      Serial.print(".");
    }
    Serial.println("\nWiFi connected");
    espClient.setInsecure();
    client.setServer(mqtt_server, mqtt_port);
    client.setCallback(callback);
  }
  
  void loop() {
    if (!client.connected()) {
      reconnect();
    }
    client.loop();
    irValue = analogRead(IR);
    ldrvalue= analogRead(LDR);
    if(ldrvalue<=2000){
      digitalWrite(led,HIGH);
    }else digitalWrite(led,LOW);
    if (irValue<=70 && laststatus=="open"){
      CloseMode();
    }
    delay(300);
    
  }

  void OpenMode(){
    myservo.write(90);
    delay(500);
    
    lcd.clear();
    lcd.setCursor(0,0);
    lcd.print("Safe is OPEN");
    lcd.setCursor(0,1);
    lcd.print("----------------");
  }
  void CloseMode(){
    laststatus="closed";
    myservo.write(180);
    delay(500);
    lcd.clear();
    lcd.setCursor(0,0);
    lcd.print("Safe is Closed");
    lcd.setCursor(0,1);
    lcd.print("----------------");
    client.publish(mqtt_topic_status, "closed");

  }