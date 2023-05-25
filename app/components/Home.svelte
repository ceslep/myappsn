<script lang="ts">
	import Page2 from './Page2.svelte';
  import { alert } from "@nativescript/core/ui/dialogs";
  import { onDestroy, onMount } from "svelte";
  import * as geolocation from "@nativescript/geolocation";
  import { CoreTypes,Frame } from "@nativescript/core";
  import { Template } from "svelte-native/components";
  import { navigate } from 'svelte-native';
    import { SvelteComponentDev } from 'svelte/internal';

  CoreTypes.Accuracy;

  let _latitude: string = "";
  let _longitude: string = "";
  let _altitude: string = "";
  let _speed: string = "";
  let message = "Cesar";

  const getLocalization = async () => {
    consItems = true;
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
          console.log("My current location: ", currentLocation);
          consItems = false;
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

  let _Items: ListItems = [];

  interface ListItems extends Array<objectListItems> {}

  interface Sedes {
    ind: string;
    sede: string;
  }

  interface objectListItems {
    sede: string;
  }

  const getItems = async (): Promise<ListItems> => {
    console.log("Consultando datos");
    const response = await fetch(
      "https://app.iedeoccidente.com/getasignacion.php"
    );
    const data: Sedes[] = await response.json();
    console.log("datos Consultados");
    const _data: ListItems = data.map((d: Sedes) => {
      return {
        sede: d.sede,
      };
    });
    return _data;
  };

  let consItems = false;

  const onBusyChanged = (): void => {};

  

  const goPage2 = ()=>{
  //  navigate({page:Page2})
  }
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
    <activityIndicator busy={consItems} />
    <textField hint="" bind:text={_altitude} on:textChange={handleTextChange} />
    <textField hint="" bind:text={_speed} on:textChange={handleTextChange} />
    <button
      text="Aceptar"
      on:tap={async () => {
        await alert({
          title: "Consultar Sedes",
          message: "Precione aceptar para realizar la consulta",
          okButtonText: "Aceptar",
        });
        console.log("Alert dialog closed.");
        consItems = true;
        _Items = [];
        _Items = await getItems();
        consItems = false;
        console.log(_Items);
      }}
    />
    <label class="info">
      <formattedString>
        <span class="fas" text="&#xf135;" />
        <span text=" Hola {message}" />
      </formattedString>
    </label>
    <activityIndicator busy={consItems} />
    <listView items={_Items.map((d) => d.sede)} separatorColor="blue">
      <Template let:item key="odd">
        <label text={item} />
      </Template>
    </listView>
    <button
      text="Siguiente"
      on:tap={goPage2}
    />
  </flexboxLayout>
</page>

<style>
  .info .fas {
    color: #3a53ff;
  }

  .info {
    font-size: 20;
    text-align: center;
    vertical-align: center;
  }
</style>
