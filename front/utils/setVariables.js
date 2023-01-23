
export default  function setVariables(settings) {
    
    const variables = document.querySelector(':root');

    variables.style.setProperty('--color__primary', `${settings?.mainBrandColor}`);
    variables.style.setProperty('--color__primary_10', `${settings?.mainBrandColor}19`);
    variables.style.setProperty('--color__primary_30', `${settings?.mainBrandColor}4C`);

    variables.style.setProperty('--color__secondary', `${settings?.additionalBrandColor}`);
    variables.style.setProperty('--color__secondary_10', `${settings?.additionalBrandColor}19`);
    variables.style.setProperty('--color__secondary_20', `${settings?.additionalBrandColor}33`);

    variables.style.setProperty('--color__cta', `${settings?.colorSelected}`);
    variables.style.setProperty('--color__cta_10', `${settings?.colorSelected}19`);
    variables.style.setProperty('--color__cta_30', `${settings?.colorSelected}4C`);
    variables.style.setProperty('--color__cta_50', `${settings?.colorSelected}7F`);
    variables.style.setProperty('--color__cta_secondary', `${settings?.ctaSecondary}`);

    variables.style.setProperty('--header__bg_color', `${settings?.headerBackgroundColor}`);
    variables.style.setProperty('--header__bg_image', `'${settings?.headerBackgroundPicture}'`);

    variables.style.setProperty('--title__typo', `'${settings?.fontForTitles}'`);
    variables.style.setProperty('--description__typo', `'${settings?.fontForDescriptions}'`);
    
}
