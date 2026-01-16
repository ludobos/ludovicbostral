#!/usr/bin/env node

/**
 * Formspree Test Script
 * Test direct de l'endpoint Formspree sans navigateur
 */

const FORMSPREE_ENDPOINT = 'https://formspree.io/f/mzdddplp';

console.log('\n🧪 FORMSPREE TEST SCRIPT');
console.log('=' .repeat(50));
console.log(`📍 Endpoint: ${FORMSPREE_ENDPOINT}`);
console.log('=' .repeat(50) + '\n');

// Test data
const testData = {
    email: 'test@example.com',
    _replyto: 'test@example.com',
    fullName: 'Test User',
    company: 'Test Company Inc.',
    service: 'consulting',
    budget: '10-50k',
    message: 'This is a test submission from the Node.js test script.',
    form_type: 'test_submission'
};

console.log('📦 Test Data:');
console.log(JSON.stringify(testData, null, 2));
console.log('\n');

async function testFormspree() {
    console.log('🚀 Starting Formspree test...\n');

    try {
        // Test 1: Check if endpoint is reachable
        console.log('📡 Test 1: Checking endpoint reachability...');

        const formBody = Object.keys(testData)
            .map(key => encodeURIComponent(key) + '=' + encodeURIComponent(testData[key]))
            .join('&');

        const response = await fetch(FORMSPREE_ENDPOINT, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Accept': 'application/json'
            },
            body: formBody
        });

        console.log(`📨 Response Status: ${response.status} ${response.statusText}`);
        console.log(`📊 Response Headers:`);
        response.headers.forEach((value, key) => {
            console.log(`   ${key}: ${value}`);
        });
        console.log('');

        const responseData = await response.json();
        console.log('📥 Response Body:');
        console.log(JSON.stringify(responseData, null, 2));
        console.log('');

        if (response.ok) {
            console.log('✅ SUCCESS! Form submitted successfully to Formspree');
            console.log('');
            console.log('🎉 Test Results:');
            console.log('   ✓ Endpoint is accessible');
            console.log('   ✓ Form submission accepted');
            console.log('   ✓ Response received');
            console.log('');
            console.log('📧 Check your email for the submission!');
            return true;
        } else {
            console.log('❌ FAILED! Form submission was rejected');
            console.log('');
            console.log('🔍 Error Details:');
            console.log(`   Status: ${response.status}`);
            console.log(`   Message: ${responseData.error || 'Unknown error'}`);

            if (responseData.errors) {
                console.log('   Errors:');
                responseData.errors.forEach(err => {
                    console.log(`     - ${err.field}: ${err.message}`);
                });
            }
            return false;
        }

    } catch (error) {
        console.log('❌ EXCEPTION! Network or parsing error');
        console.log('');
        console.log('🔍 Error Details:');
        console.log(`   Message: ${error.message}`);
        console.log(`   Type: ${error.name}`);

        if (error.cause) {
            console.log(`   Cause: ${error.cause}`);
        }

        console.log('');
        console.log('💡 Possible causes:');
        console.log('   - Network connectivity issues');
        console.log('   - Formspree service is down');
        console.log('   - CORS or security restrictions');
        console.log('   - Invalid endpoint URL');

        return false;
    }
}

// Run the test
testFormspree()
    .then(success => {
        console.log('\n' + '='.repeat(50));
        if (success) {
            console.log('🎊 ALL TESTS PASSED!');
            process.exit(0);
        } else {
            console.log('💥 TESTS FAILED!');
            process.exit(1);
        }
    })
    .catch(error => {
        console.error('\n💥 UNEXPECTED ERROR:', error);
        process.exit(1);
    });
