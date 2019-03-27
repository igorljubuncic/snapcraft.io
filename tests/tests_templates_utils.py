import unittest

from webapp import template_utils


class TemplateUtilsTest(unittest.TestCase):
    def test_generate_slug(self):
        result = template_utils.generate_slug("/snaps")
        self.assertEqual(result, "account")

        result = template_utils.generate_slug("/listing")
        self.assertEqual(result, "account")

        result = template_utils.generate_slug("/release")
        self.assertEqual(result, "account")

        result = template_utils.generate_slug("/settings")
        self.assertEqual(result, "account")

        result = template_utils.generate_slug("/account/details")
        self.assertEqual(result, "account")

        result = template_utils.generate_slug("/")
        self.assertEqual(result, "home")

        result = template_utils.generate_slug("/build")
        self.assertEqual(result, "build")

        result = template_utils.generate_slug("/blog")
        self.assertEqual(result, "blog")

        result = template_utils.generate_slug("/iot")
        self.assertEqual(result, "iot")

        result = template_utils.generate_slug("/any-route")
        self.assertEqual(result, "store")

    def test_contains(self):
        result = template_utils.contains(["item1", "item2"], "item1")
        self.assertTrue(result)

        result = template_utils.contains(["item1", "item2"], "item3")
        self.assertFalse(result)

    def test_format_number(self):
        result = template_utils.format_number(1)
        self.assertTrue(isinstance(result, str))

        result = template_utils.format_number(10000)
        self.assertTrue(result, "10,000")

    def test_diplay_name(self):
        result = template_utils.display_name("Toto", "toto")
        self.assertEqual(result, "Toto")

        result = template_utils.display_name("Toto", "username")
        self.assertEqual(result, "Toto (username)")

    def test_join(self):
        result = template_utils.join(["item1", "item2"], "-")
        self.assertEqual(result, "item1-item2")

    def test_static_url_no_file(self):
        result = template_utils.static_url("url")
        self.assertEqual(result, "/static/url")

    def test_static_url(self):
        result = template_utils.static_url("images/rocket.png")
        self.assertEqual(result, "/static/images/rocket.png?v=7d7c26f")
