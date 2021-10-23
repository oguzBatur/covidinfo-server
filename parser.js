import cheerio from 'cheerio';
import fetch from 'sync-fetch';

/**
 *
 * @param {String} countryName Name of the country, countries with more than one words need to be defined is a 2 char ISO code.
 */


export function GetCountry(countryName)
{
    const req = fetch(`https://www.worldometers.info/coronavirus/country/${countryName}/`)
    const res = req.text()
    const $ = cheerio.load(res);
    let country = $('div > h1').eq(0).text().replace(/^\s/, '').replace(/^\s/, '').replace(/^\s/, '').replace(/\s$/, '');
    let totalCases = $('div > span').eq(0).text();
    let totalDeaths = $('div > span').eq(1).text();
    let recovered  = $('div > span').eq(2).text();
    const totalInfo = {
        country,
        totalCases,
        totalDeaths,
        recovered
    }
    return totalInfo
}
export function GetTotalCases(){
    const req = fetch(`https://www.worldometers.info/coronavirus/`);
    const res = req.text();
    const $ = cheerio.load(res);
    let totalCasesName = $('tbody').find('tr').eq(7).find('td').eq(1).text();
    let totalCases = $('tbody').find('tr').eq(7).find('td').eq(2).text();
    const information = {
        totalCasesName,
        totalCases
    };
    return information;
}

export function GetAllCountriesAtOnce(){
    const req = fetch(`https://www.worldometers.info/coronavirus/`);
    const res = req.text();
    const object = [];
    const $ = cheerio.load(res);
    $('tbody').eq(0).find('tr').each(function(){
        const country = $(this).find('td').eq(1).text().replace(/^\s/, '').replace(/^\s/, '').replace(/^\s/, '').replace(/\s$/, '');
        const totalCases = $(this).find('td').eq(2).text().replace(/^\s/, '').replace(/^\s/, '').replace(/^\s/, '').replace(/\s$/, '');
        const newCases = $(this).find('td').eq(3).text().replace(/^\s/, '').replace(/^\s/, '').replace(/^\s/, '').replace(/\s$/, '');
        const totalDeaths = $(this).find('td').eq(4).text().replace(/^\s/, '').replace(/^\s/, '').replace(/^\s/, '').replace(/\s$/, '');
        const newDeaths = $(this).find('td').eq(5).text().replace(/^\s/, '').replace(/^\s/, '').replace(/^\s/, '').replace(/\s$/, '');
        const totalRecovered = $(this).find('td').eq(6).text().replace(/^\s/, '').replace(/^\s/, '').replace(/^\s/, '').replace(/\s$/, '');
        const newRecovered = $(this).find('td').eq(7).text().replace(/^\s/, '').replace(/^\s/, '').replace(/^\s/, '').replace(/\s$/, '');
        const activeCases = $(this).find('td').eq(8).text().replace(/^\s/, '').replace(/^\s/, '').replace(/^\s/, '').replace(/\s$/, '');
        const seriousCases = $(this).find('td').eq(9).text().replace(/^\s/, '').replace(/^\s/, '').replace(/^\s/, '').replace(/\s$/, '');
        const totalTests = $(this).find('td').eq(12).text().replace(/^\s/, '').replace(/^\s/, '').replace(/^\s/, '').replace(/\s$/, '');
        const population = $(this).find('td').eq(14).text().replace(/^\s/, '').replace(/^\s/, '').replace(/^\s/, '').replace(/\s$/, '');
        object.push({
            country,
            totalCases,
            newCases,
            totalDeaths,
            newDeaths,
            totalRecovered,
            newRecovered,
            activeCases,
            seriousCases,
            totalTests,
            population
        })
    });
    return object

}


