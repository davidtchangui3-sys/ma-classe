// Au chargement, on affiche tout
window.onload = () => chargerMembres('Tous');

function ajouterMembre() {
    const nom = document.getElementById('nom').value;
    const role = document.getElementById('role').value;
    const provenance = document.getElementById('provenance').value;
    const groupeNom = document.getElementById('groupeChoisi').value;
    const fileInput = document.getElementById('photoFile');
    const fichier = fileInput.files[0]; // On récupère le fichier sélectionné

    if (!nom || !role) {
        alert("Le nom et le rôle sont obligatoires !");
        return;
    }

    // Fonction pour sauvegarder les données
    const sauvegarder = (imageData) => {
        const membre = {
            groupe: groupeNom,
            nom: nom,
            role: role,
            provenance: provenance,
            photo: imageData || "https://via.placeholder.com/40"
        };

        let groupeData = JSON.parse(localStorage.getItem('maClasse')) || [];
        groupeData.push(membre);
        localStorage.setItem('maClasse', JSON.stringify(groupeData));

        // Reset et Refresh
        document.getElementById('nom').value = "";
        document.getElementById('role').value = "";
        document.getElementById('provenance').value = "";
        fileInput.value = ""; // Vide le sélecteur de fichier
        chargerMembres('Tous');
    };

    // Lecture du fichier image
    if (fichier) {
        const reader = new FileReader();
        reader.onloadend = function() {
            sauvegarder(reader.result); // reader.result contient l'image encodée en texte
        };
        reader.readAsDataURL(fichier);
    } else {
        sauvegarder(null); // Si pas de photo, on utilise l'image par défaut
    }
}

function chargerMembres(filtre) {
    const corpsTableau = document.querySelector('#tableauMembres tbody');
    corpsTableau.innerHTML = "";
    
    let groupeData = JSON.parse(localStorage.getItem('maClasse')) || [];

    groupeData.forEach((membre, index) => {
        if (filtre === 'Tous' || membre.groupe === filtre) {
            const ligne = corpsTableau.insertRow();
            ligne.innerHTML = `
                <td><img src="${membre.photo}" class="img-profil"></td>
                <td><strong>${membre.groupe}</strong></td>
                <td>${membre.nom}</td>
                <td>${membre.role}</td>
                <td>${membre.provenance}</td>
                <td><button onclick="supprimerMembre(${index})" style="background:#ff7675; color:white;">Effacer</button></td>
            `;
        }
    });
}

function supprimerMembre(index) {
    let groupeData = JSON.parse(localStorage.getItem('maClasse'));
    groupeData.splice(index, 1);
    localStorage.setItem('maClasse', JSON.stringify(groupeData));
    chargerMembres('Tous');
}

function supprimerTout() {
    if(confirm("Tout supprimer ?")) {
        localStorage.removeItem('maClasse');
        chargerMembres('Tous');
    }
}
function imprimerListe() {
    window.print();
}