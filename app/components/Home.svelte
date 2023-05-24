<script lang="ts">
  import { alert } from "@nativescript/core/ui/dialogs";
  import { onDestroy, onMount } from "svelte";
  import * as geolocation from "@nativescript/geolocation";
  import { CoreTypes } from "@nativescript/core";

  CoreTypes.Accuracy;

  let _latitude: string = "";
  let _longitude: string = "";
  let _altitude: string = "";
  let _speed: string = "";
  let message = "Cesar";

  const getLocalization = async () => {
    geolocation.enableLocationRequest().then(() => {
      geolocation
        .getCurrentLocation({
          desiredAccuracy: CoreTypes.Accuracy.high,
          maximumAge: 5000,
          timeout: 20000,
          updateTime: 1000,
        })
        .then((currentLocation) => {
          currentLocation;
          _latitude = currentLocation.latitude.toString();
          _longitude = currentLocation.longitude.toString();
          _altitude = currentLocation.altitude.toString();
          _speed = currentLocation.speed.toString();
          console.log("My current latitude: ", currentLocation);
        });
    });
  };
  let iniciarlInterval = false;

  let _location;
  onMount(async () => {
    getLocalization();
   // iniciarlInterval = true;
  });

  let interval: any;

  $: if (iniciarlInterval) {
    interval = setInterval(() => {
      getLocalization();
    }, 55000);
  }

  onDestroy(() => {
    clearInterval(interval);
  });

  let nombre = "";

  function handleTextChange() {
  //  console.log("Nuevo valor:", nombre);
  }

  let data: any;

  const getItems = async () => {
    try{
    console.log("Consultando datos");
    const response = await fetch(
      "https://app.iedeoccidente.com/getasignacion.php"
    );
    const data=await response.json();
    console.log("datos Consultados")
    return data;
    }catch(error){
      console.log(error)
    }
  };
</script>

<page>
  <actionBar title="Localización" backgroundColor="navy" color="white" />

  <flexboxLayout flexDirection="column" backgroundColor="#FFFFDD">
    <textField hint="" bind:text={_latitude} on:textChange={handleTextChange} />
    <textField
      hint=""
      bind:text={_longitude}
      on:textChange={handleTextChange}
    />
    <textField hint="" bind:text={_altitude} on:textChange={handleTextChange} />
    <textField hint="" bind:text={_speed} on:textChange={handleTextChange} />
    <button
      text="Aceptar"
      on:tap={async () => {
        await alert(`Your date is`);
        console.log("Alert dialog closed.");
        data = await getItems();
        data=[...data.map(d=>d.sede)]
        console.log(data);
      }}
    />
    <label class="info">
      <formattedString>
        <span class="fas" text="&#xf135;" />
        <span text=" Hola {message}" />
      </formattedString>
    </label>
    <listView items={data} />
  </flexboxLayout>
</page>

<style>
  .info .fas {
    color: #3a53ff;
  }

  .info {
    font-size: 20;
    horizontal-align: center;
    vertical-align: center;
  }
</style>
