import unittest
import os
import json
from pangu_brain import generate_idea

# Ensure we have a key for testing
os.environ["DEEPSEEK_API_KEY"] = "sk-65e100e6bc9a45309351592b7872f81e"

class TestPanguBrain(unittest.TestCase):
    
    def test_structure(self):
        """Test if the generated JSON has all required top-level keys."""
        print("\nTesting 'AI健身App'...")
        result = generate_idea("做一个AI健身App")
        
        # Check for error first
        if "error" in result:
            self.fail(f"API returned error: {result['error']}")
            
        # Verify top-level keys
        required_keys = ["header", "positioning", "reason", "loop", "saas_hook"]
        for key in required_keys:
            self.assertIn(key, result, f"Missing key: {key}")
            
        # Verify nested keys (sample check)
        self.assertIn("project_name", result["header"])
        self.assertIn("slogan", result["header"])
        self.assertIn("track", result["positioning"])
        self.assertIsInstance(result["loop"]["steps"], list)
        
    def test_empty_input(self):
        """Test handling of empty input (though API might just return garbage, 
        we want to ensure no crash)."""
        # This depends on API behavior, but let's just see if it crashes
        try:
            generate_idea("")
        except Exception as e:
            self.fail(f"Function crashed on empty input: {e}")

if __name__ == '__main__':
    unittest.main()
