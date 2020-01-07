<?php


require_once(__DIR__ . '/vendor/autoload.php');
use Facebook\WebDriver\JavaScriptExecutor;
use Facebook\WebDriver\WebDriverWindow ;
$host = 'http://localhost:4444/wd/hub'; // this is the default
$USE_FIREFOX = false; // if false, will use chrome.

if ($USE_FIREFOX)
{
    $driver = Facebook\WebDriver\Remote\RemoteWebDriver::create(
        $host, 
        Facebook\WebDriver\Remote\DesiredCapabilities::firefox()
    );
}
else
{
    $driver = Facebook\WebDriver\Remote\RemoteWebDriver::create(
        $host, 
        Facebook\WebDriver\Remote\DesiredCapabilities::chrome()
    );
}

$driver->get("http://localhost:4200/");
$driver->manage()->window()->maximize() ;
 

# enter mail adresse
$email_input = $driver->findElement(Facebook\WebDriver\WebDriverBy::name('email'));
$email_input->click() ;
sleep(1) ;
$email_input->sendKeys("admin@esi.dz") ;
sleep(1) ;
# enter mail adresse
$pass_input = $driver->findElement(Facebook\WebDriver\WebDriverBy::name('password'));
$pass_input->click() ;
sleep(1) ;
$pass_input->sendKeys("abdoutop2") ;
sleep(2) ;
$driver->findElement(Facebook\WebDriver\WebDriverBy::cssSelector('.btn_login'))->click();
sleep(2) ;
$driver->wait(1000 , 5000)->until(
    Facebook\WebDriver\WebDriverExpectedCondition::visibilityOfElementLocated(Facebook\WebDriver\WebDriverBy::cssSelector('.logout_btn'))
) ;


sleep(1) ;
$driver->findElement(Facebook\WebDriver\WebDriverBy::cssSelector('.fa-user'))->click();
$driver->wait(1000 , 5000)->until(
    Facebook\WebDriver\WebDriverExpectedCondition::visibilityOfElementLocated(Facebook\WebDriver\WebDriverBy::cssSelector('.one_etudiant_div'))
) ;
$driver->findElement(Facebook\WebDriver\WebDriverBy::cssSelector('#mat-input-2'))->click() ;
sleep(1) ;
$driver->findElement(Facebook\WebDriver\WebDriverBy::cssSelector('#mat-input-2'))->sendKeys("Badeche") ;
sleep(2) ;
$driver->findElement(Facebook\WebDriver\WebDriverBy::cssSelector('.one_etudiant_div'))->click() ;

