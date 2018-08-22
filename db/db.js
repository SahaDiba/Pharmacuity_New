
// var sql = require('mssql');



// module.exports = {

//     /** Define sql queries here  */
//     ConnectDB: function (myquery){
//     //function ConnectDB() {
//       return new Promise(function (fulfill, reject) {
//       var config = {
//         user: 'tcg_dev',
//         password: 'LcABurlIn9t0n',
//         server: '52.11.255.238',
//         port: '1433',
//         database: 'Refined',
    
//           options: {
//               encrypt: true
//           }
//     };
    
//       var connection = new sql.ConnectionPool(config);

//       connection.connect((err) => {
//           if (err) reject(err);
    
     
//      let query = myquery
//       connection.request()
//       .query(query, (err, recordeset) => {
//           //console.dir('Record set: ' + recordeset)
//           //console.dir('Err: ' + err)
    
//           if (err) reject(err);
//           else fulfill(recordeset);
//       });
//     });
    
//      });
//     }




    


//   }


const sql = require('mssql');

const config = {
  user: 'tcg_dev',
  password: 'LcABurlIn9t0n',
  server: '52.11.255.238',
  port: '1433',
  database: 'Refined',
  options: {
    encrypt: true // Use this if you're on Windows Azure
  }
};
const connectionPool = new sql.ConnectionPool(config, err => { });
connectionPool.request().query(`select count(distinct a.protocolid) as Studies from protocol a inner join pftosa pf on a.protocolid =pf.protocolid inner JOIN TherapeuticArea F1 ON a.TherapeuticAreaId=F1.TherapeuticAreaId inner JOIN SubIndication F3 ON a.SubIndicationId=F3.SubIndicationId and a.ClinicalIndicationId = F3.ClinicalIndicationId inner join clinicalindication b on a.clinicalindicationid = b.clinicalindicationid inner join Therapy th on a.TherapyId = th.TherapyId left join ProtocolDiseaseStage pds on a.Protocolid = pds.ProtocolId inner join diseasestage ds on ds.diseasestageid = pds.diseasestageid inner join Phase ph on a.phaseid = ph.phaseid inner join LineOfTherapy lp on a.LineOfTherapyId = lp.LineOfTherapyId inner JOIN Country Co ON Co.CountryId = pf.CountryId inner JOIN Sponsor c ON a.SponsorId = c.SponsorId where a.ClinicalIndicationId != 43 and SponsorDisplayName='SPONSOR' and TherapeuticAreaName = 'ONCOLOGY' and PhaseName = 'PHASE 2' and SubIndicationName='EBC, HER2+' and ClinicalIndicationName = 'BREAST CANCER' and HasCancerImmunotherapy = '0' and DiseaseStageName = 'EARLY' and AdultPediatric ='1' and a.Protocolid not in(select protocolid from ProtocolExclusionList) and PhaseName = 'PHASE 2' and LineOfTherapyName ='ADJUVANT' and th.TherapyName='MONOTHERAPY' and SiteCount = '51 - 100' and	PatientRandomized='201 - 500' and CountryName LIKE '${ "CANADA" }%'`).then((result) => {
 console.log(result.recordset[0].Studies);

})