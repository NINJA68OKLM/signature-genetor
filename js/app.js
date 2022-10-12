jQuery(function ($) {
    // Expressions régulières
    var maj = /^[A-Z][a-z]{1,}$/
    var ld = /^[0][0-9]{9}$/
    var mail = /^[a-zA-Z]{4,}.[a-z]{1,}@[a-z]{1,}[-.][a-z]{2,3}$/
    var sw = /^w{3}.[a-z]{3,}.[a-z]{2,3}$/

    // creation_entre.php
    
    // Affichage du bouton pour la redirection vers la déclaration d'employés ou la connexion
    if ($("[name='tel']").val()!== "" && $("[name='site']").val()!== "" && $("[name='empl']").val()!== "" && $("[name='sign']").val()!=="" && $("[name='entr']").val()!== "" && $("[name='adre']").val()!== "" && $("[name='vill']").val()!== "" && $("[name='site']").val().match(sw) && $("[name='vill']").val().match(maj) && $("[name='cp']").val()!== "" && $(".filename").html() !== " Aucun fichier selectionné...") {
        if ($(".confirmation").html() !== "Votre entreprise a bien été enregistré dans notre base de données ! A présent déclarez vos employés.")
        {
            $(".entre_connex").css("display", "initial")
            $(".entre_confirm").css("display", "none")
        }
        else
        {
            $(".entre_connex").css("display", "none")
            $(".entre_confirm").css("display", "initial")
        }
        $(".entre_decla, [name='logo'], .br").css("display", "none")
        $("#label_file").css("display", "flex")
    }

    // Remplissage du formulaire
    // Clic sur "Déclarez vos employés"
    $(".form_entre .entre_confirm").on("click", function (e) {
        e.preventDefault()
        // Redirection lors de la validation du formulaire
        setTimeout(function () {
            window.location.replace("creation_emplo_test.php")
        }, 1000)
    })
    // Clic sur "Connexion"
    $(".form_entre .entre_connex").on("click", function (e) {
        e.preventDefault()
        // Redirection lors de la validation du formulaire
        setTimeout(function () {
            window.location.replace("login.php")
        }, 1000)
    })

    // creation_emplo.php
    if ($(".logoimg").attr("src") ==  "img/uploads/")
    {
        console.log("erreur rt")
    }
    // Redirection au cas où un internaute tenterait d'accéder à la page sans avoir déclaré l'entreprise
    // if (window.location.href.indexOf(window.location.host+"/Proto/creation_emplo_test.php")!=-1)
    if (window.location.href.indexOf("/creation_emplo_test.php")!=-1)
    {
        if ($("[name='tel']").val()== "" && $("[name='site']").val()== "" && $("[name='empl']").val()== "" && $("[name='sign']").val("") && $("[name='entr']").val()== "" && $("[name='adre']").val()== "" && $("[name='vill']").val()== "" && $("[name='cp']").val()== "" && $(".logoimg").attr("src") ==  "img/uploads/")
        {
            window.location.replace("creation_entre_test.php")
        }
    }

    // Employés à déclarer
    $(document).on("click", ".enregistrer", function (e) {
        e.preventDefault()
        let emptyfield = false
        var fild = []
        const formId = $(this).data('formId')
        $.cookie("formid", formId)
        const form = "#form_employ_" + formId
        const zone = "#zone_" + formId
        const tableau = $(form).serializeArray()
        $.each(tableau, function (index, field) {
            // Toujours utile de garder le morceau de code en-dessous en guise d'exemple
            // if (field.value === "" && ((field.value = "nom") === "") && ((field.value = "prenom") === "") && ((field.value = "fonction") === "") && ((field.value = "ld") === "") && ((field.value = "mail") === "")) {
            //     alert("Remplissez tous les champs du formulaire")
            //     $(".erreur_" + formId).text("Remplissez tous les champs du formulaire")
            //     emptyfield = true
            //     return emptyfield;

            // }
            // On insère la valeur des champs dans un tableau
            fild.push(field.value)
            
        })

        // Si on détecte d'une seule valeur est vide ou comporte juste un espace
        if (fild.indexOf("")!==-1 | fild.indexOf(" ")!==-1)
        {
            $(zone).html("")
            $(".erreur_" + formId).text("Remplissez tous les champs du formulaire")
            emptyfield=true
            return emptyfield
        }

        // Enregistrement d'un employé
        if (emptyfield==false && $.isNumeric($("[name='ld_" + formId + "']").val()) && $("[name='ld_" + formId + "']").val().length >= 10 && $("[name='nom_" + formId + "']").val().match(maj) && $("[name='prenom_" + formId + "']").val().match(maj) && $("[name='fonction_" + formId + "']").val().match(maj) && $("[name='ld_" + formId + "']").val().match(ld) && $("[name='mail_" + formId + "']").val().match(mail)) {
            // Appel du fichier "insert_database.php" pour enregistrer les employés
            $.get("insert_database.php", function(data){
                console.log(data)
            })
            // Aperçu des RS
            $(".trait.ele").css("display", "initial")
            $(".champsrs").css("display", "initial")
            $(".formRS").css("display", "flex")
            // Création des boutons d'aperçu et de téléchargement
            $(zone).html("<p style='margin-left: 15px; font-weight: bold;'>La signature de cette personne a bien été créé !</p> <br> <div style='display: flex; justify-content: left;'><input type='submit' name='apercu_" + formId + "' value='Aperçu' class='button apercu_submit' id='apercu_" + formId + "' style='margin-left: 15px;' data-form-id='" + formId + "'> <a href='signatures/Signature_"+$("[name='nom_"+formId+"']").val()+"_"+$("[name='prenom_"+formId+"']").val()+".html' download class='button telecharger' style='border-top: 1px solid #FFF; margin-left: 15px;' data-form-id='"+ formId +"' name='telecharger_" + formId + "'> Télécharger </a> </div>");
            // Signatures
            var signaturehaut = `<table style="font-family:Arial, Helvetica, sans-serif !important; margin-right:0; margin-left:auto; line-height:19px; width: 100%; height: 100%; " cellpadding="0" cellspacing="0" id="table">
                    <tbody>
                        <tr style="font-size: 14px;">
                            <!-- Identité -->
                            <td style=" height:35px; vertical-align:center; text-align: left;" valign="center" align="right">
                                <span>
                                    <img src="img/uploads/${$(".logonom").data("nomId")}" alt="agence-cactus.fr" style="max-height:150px; height:auto; border:0;" height="150">
                                </span>
                                <br>
                                <span id="nom" style="font-weight:bold; font-size: 18px; font-family: Arial, Helvetica, sans-serif;">${$("[name='prenom_" + formId + "']").val()} ${$("[name='nom_" + formId + "']").val().toUpperCase()}</span>
                                <br>
                                <!-- Poste -->
                                    <span style="color: rgb(100, 99, 99); font-style: italic; font-family: Arial, Helvetica, sans-serif;">
                                        ${$("[name='fonction_" + formId + "']").val()}
                                    </span>
                                    <br>
                                <!-- Mail -->
                                    <span style="color: rgb(100, 99, 99); font-family: Arial, Helvetica, sans-serif;"><a href="${$("[name='mail_" + formId + "']").val()}" style="color: rgb(100, 99, 99); text-decoration: none;">${$("[name='mail_" + formId + "']").val()}</a></span>
                                <br>
                                    <!-- Numéro de teléphone -->
                                <span style="font-weight: bold; color: rgb(100, 99, 99); font-family: Arial, Helvetica, sans-serif;">
                                    Tél : <a style="color: rgb(100, 99, 99); text-decoration: none;" href="tel:${$("[name='ld_" + formId + "']").val()}">${$("[name='ld_" + formId + "']").val()} (ligne directe)</a>
                                </span>
                                <br> <br> 
                                <span style="color: #156cad; font-family: Arial, Helvetica, sans-serif;">
                                    ${$("[name='adre']").val()}, ${$("[name='cp']").val()} ${$("[name='vill']").val()}
                                </span>
                                <br>
                                <span style="color: #156cad; font-family: Arial, Helvetica, sans-serif;">
                                    Tél : <a href="tel: ${$("[name='tel']").val()}" style="color: #156cad; text-decoration: none;">${$("[name='tel']").val()}</a>
                                </span>
                                <br>
                                <span style="display: flex;" class='cacher'>
                                    <!-- Site web -->
                                    <span style="font-weight: bold; font-family: Arial, Helvetica, sans-serif;">
                                        <a style="color: #156cad; text-decoration: none;" href="${$("[name='site']").val()}">${$("[name='site']").val()}</a>
                                    </span>
                                    <span class="signRS" style='display: flex; margin-left: 5px;'></span> 
                                </span>
                            </td>
                        </tr>
                    </tbody>
                </table>`
            var signaturebas = `<table style="font-family:Arial, Helvetica, sans-serif !important; margin-right:0; margin-left:auto; line-height:19px; width: 100%; height: 100%; " cellpadding="0" cellspacing="0" id="table">
                    <tbody>
                        <tr style="font-size: 14px;">
                            <!-- Identité -->
                            <td style=" height:35px; vertical-align:center; text-align: left;" valign="center" align="right">
                                <span id="nom" style="font-weight:bold; font-size: 18px; font-family: Arial, Helvetica, sans-serif;">${$("[name='prenom_" + formId + "']").val()} ${$("[name='nom_" + formId + "']").val().toUpperCase()}</span>
                                <br>
                            <!-- Poste -->
                                <span style="color: rgb(100, 99, 99); font-style: italic; font-family: Arial, Helvetica, sans-serif;">
                                    ${$("[name='fonction_" + formId + "']").val()}
                                </span>
                                <br>
                            <!-- Mail -->
                                <span style="color: rgb(100, 99, 99); font-family: Arial, Helvetica, sans-serif;"><a href="${$("[name='mail_" + formId + "']").val()}" style="color: rgb(100, 99, 99); text-decoration: none;">${$("[name='mail_" + formId + "']").val()}</a></span>
                            <br>
                                <!-- Numéro de teléphone -->
                            <span style="font-weight: bold; color: rgb(100, 99, 99); font-family: Arial, Helvetica, sans-serif;">
                                Tél : <a style="color: rgb(100, 99, 99); text-decoration: none;" href="tel:${$("[name='ld_" + formId + "']").val()}">${$("[name='ld_" + formId + "']").val()} (ligne directe)</a>
                            </span>
                            <br> <br> 
                            <span style="color: #156cad; font-family: Arial, Helvetica, sans-serif;">
                                ${$("[name='adre']").val()}, ${$("[name='cp']").val()} ${$("[name='vill']").val()}
                            </span>
                            <br>
                            <span style="color: #156cad; font-family: Arial, Helvetica, sans-serif;">
                                Tél : <a href="tel: ${$("[name='tel']").val()}" style="color: #156cad; text-decoration: none;">${$("[name='tel']").val()}</a>
                            </span>
                            <br>
                            <span style="display: flex;" class='cacher'>
                                <!-- Site web -->
                                <span style="font-weight: bold; font-family: Arial, Helvetica, sans-serif;">
                                    <a style="color: #156cad; text-decoration: none;" href="${$("[name='site']").val()}">${$("[name='site']").val()}</a>
                                </span>
                                <span class="signRS" style='display: flex; margin-left: 5px;'></span> 
                            </span>
                            <br>
                            <span>
                                <img src="img/uploads/${$(".logonom").data("nomId")}" alt="agence-cactus.fr" style="max-height:150px; height:auto; border:0;" height="150">
                            </span>
                            </td>
                        </tr>
                    </tbody>
                </table>`
            var signaturegauche = `<div style="font-family: Arial, Helvetica, sans-serif !important; min-height: 250px; min-width: 320px; max-width: 650px; min-height: 250px; display: flex; align-items: center">
                                            <table style="padding: 2px; border-style: none; border-color: black; border-style: none; border-collapse: inherit; direction: ltr; width: 100%" cellpadding="0" cellspacing="0">
                                                <tbody>
                                                    <tr>
                                                        <td style="font-size:1pt; vertical-align:top; width: 95px;" valign="top">               
                                                            <table style="" cellpadding="0" cellspacing="0">
                                                                <tbody>
                                                                    <tr>
                                                                        <!-- Logo ou photo de profil d'une largeur de 150 px -->
                                                                        <td style="height:55px; vertical-align:top;" valign="top">
                                                                            <img src="img/uploads/${$(".logonom").data("nomId")}" style="border:0;" height="70">
                                                                        </td>
                                                                    </tr>      
                                                                </tbody>
                                                            </table>
                                                        </td>
                                                        <td style="padding-left:5px; text-align: left; vertical-align:top; " valign="top">
                                                            <table style=" margin-right:0; margin-left:auto; line-height:19px; width: 100%; height: 100%; " cellpadding="0" cellspacing="0" id="table">
                                                                <tbody>
                                                                    <tr style="font-size: 14px;">
                                                                        <!-- Identité -->
                                                                        <td style=" height:35px; vertical-align:center; text-align: left;" valign="center" align="right">
                                                                            <span id="nom" style="font-weight:bold; font-size: 18px; font-family: Arial, Helvetica, sans-serif !important;">${$("[name='prenom_" + formId + "']").val()} ${$("[name='nom_" + formId + "']").val().toUpperCase()}</span>
                                                                            <br>
                                                                        <!-- Poste -->
                                                                            <span style="color: rgb(100, 99, 99); font-style: italic; font-family: Arial, Helvetica, sans-serif;">
                                                                                ${$("[name='fonction_" + formId + "']").val()}
                                                                            </span>
                                                                            <br>
                                                                        <!-- Mail -->
                                                                            <span style="color: rgb(100, 99, 99); font-family: Arial, Helvetica, sans-serif !important;"><a href="mailto:${$("[name='mail_" + formId + "']").val()}" style="color: rgb(100, 99, 99); text-decoration: none;">${$("[name='mail_" + formId + "']").val()}</a></span>
                                                                            <br>
                                                                            <!-- Numéro de téléphone -->
                                                                        <span style="color: rgb(100, 99, 99); font-family: Arial, Helvetica, sans-serif !important; font-weight: bold;">
                                                                            Tél : <a style="text-decoration: none; color: rgb(100, 99, 99);" href="tel:${$("[name='ld_" + formId + "']").val()}">${$("[name='ld_" + formId + "']").val()} (ligne directe)</a>
                                                                        </span>
                                                                        <div class="signRS" style="display: flex;"></div>
                                                                        </td>
                                                                    </tr>
                                                                        
                                                                </tbody>
                                                            </table>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div> `
            var signaturegauche = `<div style="font-family: Arial, Helvetica, sans-serif !important; min-height: 250px; min-width: 320px; max-width: 650px; min-height: 250px; display: flex; align-items: center">
                                            <table style="padding: 2px; border-style: none; border-color: black; border-style: none; border-collapse: inherit; direction: ltr; width: 100%" cellpadding="0" cellspacing="0">
                                                <tbody>
                                                    <tr>
                                                        <td style="font-size:1pt; vertical-align:top; width: 95px;" valign="top">               
                                                            <table style="" cellpadding="0" cellspacing="0">
                                                                <tbody>
                                                                    <tr>
                                                                        <!-- Logo ou photo de profil d'une largeur de 150 px -->
                                                                        <td style="height:55px; vertical-align:top;" valign="top">
                                                                            <img src="img/uploads/${$(".logonom").data("nomId")}" style="border:0;" height="70">
                                                                        </td>
                                                                    </tr>      
                                                                </tbody>
                                                            </table>
                                                        </td>
                                                        <td style="padding-left:5px; text-align: left; vertical-align:top; " valign="top">
                                                            <table style=" margin-right:0; margin-left:auto; line-height:19px; width: 100%; height: 100%; " cellpadding="0" cellspacing="0" id="table">
                                                                <tbody>
                                                                    <tr style="font-size: 14px;">
                                                                        <!-- Identité -->
                                                                        <td style=" height:35px; vertical-align:center; text-align: left;" valign="center" align="right">
                                                                            <span id="nom" style="font-weight:bold; font-size: 18px; font-family: Arial, Helvetica, sans-serif !important;">${$("[name='prenom_" + formId + "']").val()} ${$("[name='nom_" + formId + "']").val().toUpperCase()}</span>
                                                                            <br>
                                                                        <!-- Poste -->
                                                                            <span style="color: rgb(100, 99, 99); font-style: italic; font-family: Arial, Helvetica, sans-serif;">
                                                                                ${$("[name='fonction_" + formId + "']").val()}
                                                                            </span>
                                                                            <br>
                                                                        <!-- Mail -->
                                                                            <span style="color: rgb(100, 99, 99); font-family: Arial, Helvetica, sans-serif !important;"><a href="mailto:${$("[name='mail_" + formId + "']").val()}" style="color: rgb(100, 99, 99); text-decoration: none;">${$("[name='mail_" + formId + "']").val()}</a></span>
                                                                            <br>
                                                                            <!-- Numéro de téléphone -->
                                                                        <span style="color: rgb(100, 99, 99); font-family: Arial, Helvetica, sans-serif !important; font-weight: bold;">
                                                                            Tél : <a style="text-decoration: none; color: rgb(100, 99, 99);" href="tel:${$("[name='ld_" + formId + "']").val()}">${$("[name='ld_" + formId + "']").val()} (ligne directe)</a>
                                                                        </span>
                                                                        <div class="signRS" style="display: flex;"></div>
                                                                        </td>
                                                                    </tr>
                                                                        
                                                                </tbody>
                                                            </table>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div> `
            var signaturedroite = `<div style="font-family: Arial, Helvetica, sans-serif !important; min-height: 250px; min-width: 320px; max-width: 650px; min-height: 250px; display: flex; align-items: center">
                                        <table style="padding: 2px; border-style: none; border-color: black; border-style: none; border-collapse: inherit; direction: ltr; min-width: 320px" cellpadding="0" cellspacing="0">
                                            <tbody>
                                                <tr>
                                                    <td style="padding-left:5px; text-align: left; vertical-align:top; " valign="top">
                                                        <table style=" margin-right:0; margin-left:auto; line-height:19px; width: 235px; height: 100%; " cellpadding="0" cellspacing="0" id="table">
                                                            <tbody>
                                                                <tr style="font-size: 14px;">
                                                                    <!-- Identité -->
                                                                    <td style=" height:35px; vertical-align:center; text-align: left;" valign="center" align="right">
                                                                        <span id="nom" style="font-weight:bold; font-size: 18px; font-family: Arial, Helvetica, sans-serif !important;">${$("[name='prenom_" + formId + "']").val()} ${$("[name='nom_" + formId + "']").val().toUpperCase()}</span>
                                                                        <br>
                                                                    <!-- Poste -->
                                                                        <span style="color: rgb(100, 99, 99); font-style: italic; font-family: Arial, Helvetica, sans-serif;">
                                                                            ${$("[name='fonction_" + formId + "']").val()}
                                                                        </span>
                                                                        <br>
                                                                    <!-- Mail -->
                                                                        <span style="color: rgb(100, 99, 99); font-family: Arial, Helvetica, sans-serif !important;"><a href="mailto:${$("[name='mail_" + formId + "']").val()}" style="color: rgb(100, 99, 99); text-decoration: none;">${$("[name='mail_" + formId + "']").val()}</a></span>
                                                                        <br>
                                                                        <!-- Numéro de téléphone -->
                                                                    <span style="color: rgb(100, 99, 99); font-family: Arial, Helvetica, sans-serif !important; font-weight: bold;">
                                                                        Tél : <a style="text-decoration: none; color: rgb(100, 99, 99);" href="tel:${$("[name='ld_" + formId + "']").val()}">${$("[name='ld_" + formId + "']").val()} (ligne directe)</a>
                                                                    </span>
                                                                    <div class="signRS" style="display: flex;"></div>
                                                                    </td>
                                                                </tr>
                                                                    
                                                            </tbody>
                                                        </table>
                                                    </td>
                                                    <td style="font-size:1pt; vertical-align:top; width: 95px;" valign="top">               
                                                        <table style="" cellpadding="0" cellspacing="0">
                                                            <tbody>
                                                                <tr>
                                                                    <!-- Logo ou photo de profil d'une largeur de 150 px -->
                                                                    <td style="height:55px; vertical-align:top;" valign="top">
                                                                        <img src="img/uploads/${$(".logonom").data("nomId")}" style="border:0;" height="70">
                                                                    </td>
                                                                </tr>      
                                                            </tbody>
                                                        </table>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div> `

            // Affichage de l'aperçu
            $(".apercu_submit").on("click", function (e) {
                e.preventDefault()
                // Changement d'aperçu en fonction du choix de signature
                if ($("#haut").prop("checked")) {
                    $(".apercu").html(signaturehaut)
                }
                if ($("#bas").prop("checked")) {
                    $(".apercu").html(signaturebas)
                }
                if ($("#gauche").prop("checked")) {
                    $(".apercu").html(signaturegauche)
                }
                if ($("#droite").prop("checked")) {
                    $(".apercu").html(signaturedroite)
                }
                // Intégration des RS  
                if ($(".RS").length > 0) {
                    var RS = []
                    var icones = $(".signRS").html()
                    $.each($(".RS"), function (l, k) {
                        var valeur = $(".RS:eq(" + l + ")").data("id")
                        var href = $(".URL:eq(" + l + ")").val()
                        RS.push(valeur)
                        icones = $(".signRS").html()
                        $(".signRS").append(`<span style="margin-left: 5px; margin-top: 3px;">
                                                    <a style="text-decoration: none;" href="${href}" target="_blank" rel="noopener noreferrer" style="" >
                                                        <div style="display: flex; width: 15px; justify-content: space-between;" class="icon ${valeur}"></div>
                                                    </a>
                                                </span>`)
                        $.cookie("rs_href_"+l, href)
                        readFiles()
                        function readFiles() {
                            $.get('img/Logos/' + $("[name='style']").val() + '/' + valeur + '.svg', function (data) {
                                $(".icon." + valeur).append(data)
                                console.log(data)
                                $.cookie("rs_icon_"+l, data)
                                return data
                            }, "html");
                        }
                    })
                }
            })
            $(".erreur_" + formId).text("")
        }
        // Création des cookies pour le téléchargement
            var nomm= $("[name='nom_"+formId+"']").val()
            var prenomm= $("[name='prenom_"+formId+"']").val()
            var fonctionm= $("[name='fonction_"+formId+"']").val()
            var ldm= $("[name='ld_"+formId+"']").val()
            var mailm= $("[name='mail_"+formId+"']").val()
            $.cookie("nom_"+formId, nomm, {expires: 7})
            $.cookie("prenom_"+formId, prenomm, {expires: 7})
            $.cookie("fonction_"+formId, fonctionm, {expires: 7})
            $.cookie("ld_"+formId, ldm, {expires: 7})
            $.cookie("mail_"+formId, mailm, {expires: 7})
           $.cookie("id", formId,  {expires: 7})
        // Téléchargement
        $("[name='telecharger_"+formId+"']").on("click", function () {
            $.get("download.php", function(data){
                console.log(data)
            })
            
        })
    })
    
    // Gestion des réseaux sociaux
    $(document).on("click", ".rs", function (e) {
        e.preventDefault()
        if ($("[name='style']").is(":checked")) {
            var check = [];
            ($("input[type='checkbox']:checked").prop("checked", true)).each(function (c) {
                check.push($(this).val());
                // Suppresion de la première valeur "bloc" inutile
                var myIndex = check.indexOf('bloc');
                if (myIndex !== -1) {
                    check.splice(myIndex, 1);
                }
                // Aperçu du formulaire pour les RS
                $(".pp, .style").css("display", "initial")
                $(".rs").val("Enregistrer les liens")
                // Récupération des cases à cocher pour les liens des RS             
                return check
            })
            
            // Génération des champs pour les liens des RS
            $(".champsrs").html("")
            for (let r = 0; r < check.length; r++) {
                $(".champsrs").append(`<input type="text" name="${check[r]}" id="" placeholder="URL ${check[r]}" class="URL" value=""><br>`)
            }
            $(".champsrs > :first-child").css("margin-top", "15px")
                
            // Récupération des styles de RS
            if ($(".rs").val() == "Enregistrer les liens") {
                $("body").append(`<div class="values"></div>`)
                $(".rs").on("click", function () {
                    $(".values").html("")
                    // Stockage des RS
                    $.each(check, function (q, a) {
                        if ($("[name='" + check[q] + "']").val() !== "") {
                            console.log("Stockage")
                            $("#infoRS").append(`<div class="RS" data-id="${check[q]}"></div>`)
                            $(".values").append(`<div class="RSvalue" data-id="${$("[name='" + check[q] + "']").val()}"></div>`)
                            // Ajout des réseaux sociaux sur la version téléchargeable
                            var rsnbr = check.length
                            $.cookie("rsnbr", rsnbr)
                            $.cookie("rs_"+q, a)
                        }
                    })
                })
            }
            if ($(".RSvalue").length > 0)
            {
                $.each(check, function (q, a) {
                    var RSvalue = $(".RSvalue:eq("+q+")").data("id")
                    $(".URL:eq("+q+")").val(RSvalue)
                })
            }
        }
    })

    // Zone d'aperçu
    $(".apercu").html("<div style='display: flex; justify-content: center; align-items: center; width: 100%; height: 100%;'><strong>APERCU</strong></div>")
})