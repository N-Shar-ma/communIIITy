import smartpy as sp

class BackboneContract(sp.Contract):
    def __init__(self):
        self.init(database = {})

    @sp.entry_point
    def add(self, params):
        self.data.database[params.cert] = params.url

@sp.add_test(name = "BackboneContract")
def test():
    creator = sp.test_account("Creator")
    alice   = sp.test_account("Alice")
    bob     = sp.test_account("Robert")

    c1 = BackboneContract()
    scenario  = sp.test_scenario()
    scenario.h1("Mini Kitties")
    scenario += c1
    def newKitty(cert, url):
        return sp.record(cert = cert, url = url)

    scenario += c1.add(newKitty("cert-1", "asd.abc.co")).run(sender = creator)
    scenario += c1.add(newKitty("cert-2", "asd.asdasd.co")).run(sender = creator)
    scenario += c1.add(newKitty("cert-3", "asd.ac.co")).run(sender = alice)
    scenario += c1.add(newKitty("cert-4", "asd.co.in")).run(sender = bob)


sp.add_compilation_target("backbonecontract", BackboneContract())
