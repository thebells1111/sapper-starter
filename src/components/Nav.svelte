<script>
  export let segment;
</script>

<style>
  nav {
    border-bottom: 1px solid hsla(210, 51%, 40%, .2);
    font-weight: 300;
    padding: 0 1em;
  }

  ul {
    margin: 0;
    padding: 0;
  }

  /* clearfix */
  ul::after {
    content: '';
    display: block;
    clear: both;
  }

  li {
    display: block;
    float: left;
  }

  .selected {
    position: relative;
    display: inline-block;
  }

  .selected::after {
    position: absolute;
    content: '';
    width: calc(100% - 1em);
    height: 2px;
    background-color: hsla(210, 51%, 40%, 1);
    display: block;
    bottom: -1px;
  }

  a {
    text-decoration: none;
    padding: 1em 0.5em;
    display: block;
    color: black;
  }

  a:visited {
    color: black;
  }
</style>

<nav>
  <ul>
    {#if segment === undefined || segment === 'jobhours'}
    <li>
      <a class='{segment === undefined ? "selected" : ""}' href=".">timesheet</a>
    </li>
    <li>
        <a
          rel="prefetch"
          class='{segment === "jobhours" ? "selected" : ""}'
          href="jobhours"
          >job hours</a
        >
    </li>
    <li>
      <a class='{segment === "signout" ? "selected" : ""}' 
        on:click={()=> window.localStorage.removeItem('timesheet')}
        href="api/signout"
        >signout</a
      >
    </li>   

    {:else}    
    <li>
        <a class='{segment === "login" ? "selected" : ""}' href="login">login</a>
      </li>
    {/if}
  </ul>
</nav>