// Site-wide JavaScript functionality
console.log('TAP application initialized'); 
$form.on('submit', function(e) {
    e.preventDefault();
    e.stopPropagation();

    if (this.checkValidity()) {
        // Improved form submission logic
        $analyzeButton
            .prop('disabled', true)
            .find('i').hide()
            .end()
            .find('.spinner-border').removeClass('d-none');

        // AJAX submission with better error handling
        $.ajax({
            // ... existing code with improved error handling
        });
    } else {
        $form.addClass('was-validated');
    }
});
function renderAnalysisResults(response) {
    const resultsHtml = `
        <div class="analysis-container animate__animated animate__fadeIn">
            <!-- More structured and visually appealing results -->
            <div class="row g-3">
                <!-- Badges, summary, and action items -->
            </div>
        </div>
    `;
    $results.html(resultsHtml);
}